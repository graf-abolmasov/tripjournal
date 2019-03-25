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
        ::Point.hot.where('id > ?', p1.id).each do |p|
          p2 = p
          if p1.distance_to(p2) > distance_epsilon_for_new_track ||
             p1.time_diff(p2) > time_epsilon_for_new_track
            create_from_points(points, p1.trip)
            points = []
          end
          points << p2
          p1 = p2
        end
        create_from_points(points, p1.trip)
      end
    end

    private

    def create_from_points(points, trip)
      return if points.blank? || points.length < 2

      Track.create(points: points, created_at: points.first.created_at, trip: trip)
    end
  end
end
