class GpxFile

  def self.read(filename)
    gpx =  GPX::GPXFile.new(gpx_file: filename)
    gpx.tracks.map do |t|
      t.points.map { |p| { x: p.lat, y: p.lon, created_at: p.time } }
    end
  end

end