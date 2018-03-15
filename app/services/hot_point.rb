class HotPoint
  def self.for_trip(trip)
    trip.points.hot.last ||
        trip.points.order(created_at: :desc).first ||
        trip.int_points.with_location.order(created_at: :desc).first ||
        Point.new(lat: 53.1958769, lng: 50.1283811)
  end
end