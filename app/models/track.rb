class Track < ApplicationRecord

  HQ_RESOLUTION = [0.0000005, true]
  LQ_RESOLUTION = [0.00005, false]

  belongs_to :trip

  has_many :points, -> { order(id: :asc) }, dependent: :delete_all

  before_save :prepare_geojson

  def recreate_geojson!(skip_hq: false, skip_lq: false)
    self.geojson_lq = nil unless skip_lq
    self.geojson_hq = nil unless skip_hq
    self.save!
  end

  def to_gpx
    gpx = GPX::GPXFile.new
    self.points.each do |point|
      gpx.waypoints << GPX::Waypoint.new({lat: point.lat, lon: point.lng, time: point.created_at})
    end
    gpx.to_s
  end

  private

  def prepare_geojson
    return if geojson_hq.present? && geojson_lq.present?
    points_x_y = points.map(&:to_x_y)
    self.geojson_hq ||= to_geojson(simplify(points_x_y, *HQ_RESOLUTION))
    self.geojson_lq ||= to_geojson(simplify(points_x_y, *LQ_RESOLUTION))
  end

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
