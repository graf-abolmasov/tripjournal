class Track < ActiveRecord::Base

  HQ_RESOLUTION = [0.0000005, true]
  LQ_RESOLUTION = [0.00005, false]

  serialize :geojson_hq, JSON
  serialize :geojson_lq, JSON

  has_many :points

  before_save :prepare_geojson

  private

  def prepare_geojson
    return if geojson_hq.present? && geojson_lq.present?
    points_x_y = points.map(&:to_x_y)
    self.geojson_hq ||= to_geojson(simplify(points_x_y, *HQ_RESOLUTION))
    self.geojson_lq ||= to_geojson(simplify(points_x_y, *LQ_RESOLUTION))
  end

  class << self

    def import(filename)
      ext = filename[-3..-1]
      tracks = if ext == 'kmz' || ext == 'kml'
                 KmlFile.read(filename)
               elsif ext == 'gpx'
                 GpxFile.read(filename)
               else
                 raise 'Unsupported format'
               end
      tracks.each do |t|
        transaction do
          points = t[:points].map { |p| Point.create!(lat: p[:x], lng: [:y], created_at: t[:created_at]) }
          create_from_points!(points)
        end
      end
    end

    def create_from_points!(points)
      return if points.blank? || points.length < 2
      Track.create!(points: points, created_at: points.first.created_at)
    end
  end

  private

  def to_geojson(points_x_y)
    {
        type: 'Feature',
        geometry: {
            type: 'MultiLineString',
            coordinates: [points_x_y.map { |tp| [tp[:y].to_f, tp[:x].to_f] }]
        }
    }
  end

  def simplify(points_x_y, tolerance = 1, highest_quality = false)
    SimplifyRb::Simplifier.new.process(points_x_y, tolerance, highest_quality)
  end
end
