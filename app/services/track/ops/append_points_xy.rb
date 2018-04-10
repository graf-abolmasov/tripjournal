class Track::Ops::AppendPointsXY

  class << self
    def execute(track, points_x_y)
      Point.bulk_insert(:lat, :lng, :track_id, :trip_id, :created_at, :updated_at) do |worker|
        points_x_y.each do |p|
          worker.add(lat: p[:x], lng: p[:y], track_id: track.id, trip_id: track.trip_id, created_at: p[:created_at])
        end
      end
      track.reload.recreate_geojson!
    end

    def execute_async(track, points_x_y)
      Track::Ops::AppendPointsXYJob.perform_later(track.id, points_x_y)
    end
  end
end