class AggregatePointsJob < ActiveJob::Base
  queue_as :default

  DISTANCE_EPSILON_FOR_NEW_TRACK = ENV.fetch('DISTANCE_EPSILON_FOR_NEW_TRACK', 0.02).to_f
  TIME_EPSILON_FOR_NEW_TRACK = ENV.fetch('TIME_EPSILON_FOR_NEW_TRACK', 12).to_i

  def perform
    aggregate_points
    join_tracks
  end

  private

  def aggregate_points
    Point.transaction do
      # Sort by id is allowed, because only on-line tracked points are newly added
      return if Point.newly_added.count < 2
      p1 = Point.newly_added.order(id: :asc).first
      points = [p1]
      Point.newly_added.where('id > ?', p1.id).order(id: :asc).each do |p|
        p2 = p
        if distance(p1, p2) > DISTANCE_EPSILON_FOR_NEW_TRACK ||
           time_diff(p1, p2) > TIME_EPSILON_FOR_NEW_TRACK
          Track.create_from_points!(points)
          points = []
        end
        points << p2
        p1 = p2
      end
      Track.create_from_points!(points)
    end
  end

  def join_tracks
    # Sort by id != sort by created_at, because imported tracks may have any created_at
    newer_track = Track.order(created_at: :desc).first
    tracks_to_join = []
    Track.order(created_at: :desc).where.not(id: newer_track.id).each do |older_track|
      newer_track_start_point = newer_track.points.order(created_at: :asc, id: :asc).first
      older_track_finish_point = older_track.points.order(created_at: :desc, id: :desc).first
      if distance(older_track_finish_point, newer_track_start_point) <= DISTANCE_EPSILON_FOR_NEW_TRACK &&
          time_diff(older_track_finish_point,newer_track_start_point) <= TIME_EPSILON_FOR_NEW_TRACK
        tracks_to_join.unshift(newer_track)
      else
        newer_track.join!(tracks_to_join)
        tracks_to_join = []
      end
      newer_track = older_track
    end
  end

  def dest_sqr(p1, p2)
    dx = p2.lat - p1.lat
    dy = p2.lng - p1.lng
    dx * dx + dy * dy
  end

  def time_diff(p1, p2)
    ((p1.created_at - p2.created_at) / 1.hour).abs
  end

  def distance(p1, p2)
    fi1 = to_rad(p1.lat)
    fi2 = to_rad(p2.lat)
    l1 = to_rad(p1.lng)
    l2 = to_rad(p2.lng)
    111.2 * Math.acos(Math.sin(fi1) * Math.sin(fi2) + Math.cos(fi1) * Math.cos(fi2) * Math.cos(l2-l1))
  rescue
    99999
  end

  def to_rad(deg)
    deg * Math::PI / 180.0
  end
end
