class AggregatePointsJob < ActiveJob::Base
  queue_as :default

  EPS = ENV.fetch('EPSILON_FOR_NEW_TRACK', 0.02).to_f

  def perform
    Point.transaction do
      return if Point.newly_added.order(created_at: :desc).count < 2
      last_point = Point.newly_added.order(created_at: :desc).first
      all_points = Point.newly_added.where('id <= ?', last_point.id).order(created_at: :asc).to_a
      p1 = all_points.pop
      points = [p1]
      all_points.each do |p|
        p2 = p
        if distance(p1, p2) > EPS
          Track.create_from_points(points)
          points = []
        end
        points << p2
        p1 = p2
      end
      Track.create_from_points(points)
    end
  end

  private

  def dest_sqr(p1, p2)
    dx = p2.lat - p1.lat
    dy = p2.lng - p1.lng
    dx * dx + dy * dy
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
