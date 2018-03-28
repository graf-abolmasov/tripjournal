require 'geo/coord'

class PhotoSource < ApplicationRecord

  belongs_to :traveler

  has_one :int_point, dependent: :destroy, as: :source

  scope :inverse_chronologically_sorted, -> { order(created_at: :desc) }

  before_create :ensure_image_metadata

  def lat
    return nil if meta['image_metadata']['GPSLatitude'].blank?
    parse_coord(meta['image_metadata']['GPSLatitude'], "%latd deg %latm' %lats\" %lath").lat
  end

  def lng
    return nil if meta['image_metadata']['GPSLongitude'].blank?
    parse_coord(meta['image_metadata']['GPSLongitude'], "%lngd deg %lngm' %lngs\" %lngh").lng
  end

  def big_url
    Images.big_url(cl_public_id)
  end

  def thumb_url
    Images.thumb_url(cl_public_id)
  end

  private

  def parse_coord(coord, format)
    Geo::Coord.strpcoord(coord, format)
  end

  def ensure_image_metadata
    self.meta ||= Cloudinary::Uploader.explicit(cl_public_id, options = { image_metadata: true, type: :upload })
  end
end
