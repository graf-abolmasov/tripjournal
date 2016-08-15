class Track < ActiveRecord::Base

  def self.create_from_points(points, created_at)
    return if points.length == 1
    Track.create!(json: to_geojson(simplify(points)), created_at: created_at)
  end

  def self.import(filename)
    ext = filename[-3..-1]
    tracks = if ext == 'kmz' || ext == 'kml'
               KmlFile.read(filename)
             elsif ext == 'gpx'
               GpxFile.read(filename)
             else
               raise 'Unsupported format'
             end
    tracks.each { |t| create_from_points(t[:points], t[:created_at]) }
  end

  def self.to_geojson(points)
<<-JSON
{
  "type": "Feature",
  "geometry": {
    "type": "MultiLineString",
    "coordinates": [[#{points.map { |tp| "[#{tp[:y].to_f}, #{tp[:x].to_f}]" }.join(', ')}]]
  }
}
JSON
  end

  def self.simplify(points)
    SimplifyRb::Simplifier.new.process(points, 0.0000005, true)
  end

end
