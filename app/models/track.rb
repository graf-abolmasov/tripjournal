class Track < ApplicationRecord

  HQ_RESOLUTION = [0.0000005, true]
  LQ_RESOLUTION = [0.00005, false]

  belongs_to :trip

  has_many :points, -> { order(id: :asc) }, dependent: :delete_all

  scope :without_processing, -> { where(type: nil) }

  before_save :prepare_geojson

  def recreate_geojson!
    update_attributes!(geojson_lq: nil, geojson_hq: nil)
  end

  def to_gpx
    GpxFile.from_track(self)
  end

  def to_geojson
    { id: id, type: 'FeatureCollection', features: geojson_lq }
  end

  private

  def prepare_geojson
    self.geojson_hq ||= Track::Utils::GeoJson.from_track(self, *HQ_RESOLUTION)
    self.geojson_lq ||= Track::Utils::GeoJson.from_track(self, *LQ_RESOLUTION)
  end
end
