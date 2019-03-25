# frozen_string_literal: true

class Track::Ops::AggregateHotPoints
  # EXPERIMENTAL

  class << self
    def execute(distance_epsilon_for_new_track:, time_epsilon_for_new_track:)
      ::Point.transaction do
        # Sort by id is allowed, because only on-line tracked points are newly added
        return if ::Point.hot.count < 2

        p1 = ::Point.hot.first
        points = [p1]
        points_after(p1).each do |p|
          p2 = p
          if create_track?(p1, p2, distance_epsilon_for_new_track, time_epsilon_for_new_track)
            create_track(points, p1.trip)
            points = []
          end
          points << p2
          p1 = p2
        end
        create_track(points, p1.trip)
      end
    end

    private

    def points_after(point)
      ::Point.hot.where('id > ?', point.id)
    end

    def create_track?(point1, point2, distance_epsilon, time_epsilon)
      point1.distance_to(point2) > distance_epsilon || point1.time_diff(point2) > time_epsilon
    end

    def create_track(points, trip)
      return if points.blank? || points.length < 2

      Track.create(points: points, created_at: points.first.created_at, trip: trip)
    end
  end
end
