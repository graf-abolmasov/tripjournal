class GpxFile

  class << self
    def read(filename)
      gpx =  GPX::GPXFile.new(gpx_file: filename)
      gpx.tracks.map do |t|
        t.points.map { |p| { x: p.lat, y: p.lon, created_at: p.time } }
      end
    end

    def from_track(track)
      gpx = GPX::GPXFile.new
      track.points.each do |point|
        gpx.waypoints << GPX::Waypoint.new({lat: point.lat, lon: point.lng, time: point.created_at})
      end
      gpx.to_s
    end
  end
end