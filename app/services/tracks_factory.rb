class TracksFactory

  class << self
    def create_from_file(filename)
      tracks = read_tracks_from_file(filename)
      tracks.each do |track|
        create_from_points_x_y(track)
      end
    end

    def create_from_points(points)
      return if points.blank? || points.length < 2
      Track.create(points: points, created_at: points.first.created_at)
    end

    private

    def create_from_points_x_y(points_x_y)
      Track.transaction do
        new_track = Track.create(created_at: points_x_y.first[:created_at])
        Point.bulk_insert(:lat, :lng, :track_id, :created_at, :updated_at) do |worker|
          points_x_y.each do |p|
            worker.add(lat: p[:x], lng: p[:y], track_id: new_track.id, created_at: p[:created_at])
          end
        end
        new_track.reload.recreate_geojson!
      end
    end

    def read_tracks_from_file(filename)
      ext = filename[-3..-1]
      if ext == 'kmz' || ext == 'kml'
        KmlFile.read(filename)
      elsif ext == 'gpx'
        GpxFile.read(filename)
      else
        raise 'Unsupported format'
      end
    end
  end
end