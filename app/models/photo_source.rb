class PhotoSource < ApplicationRecord

  belongs_to :traveler

  validates :file, presence: true

  mount_uploader :file, PhotoUploader

  serialize :file_exif

  after_save :create_int_point, on: :create

  private

  def create_int_point
    IntPoint.create do |int_point|
      int_point.source = self
      int_point.traveler = traveler
      int_point.image_url = file.normal.url
      int_point.source_url = file.url
      int_point.created_at = created_at
      if file_exif.gps.present?
        int_point.lat = file_exif.gps.latitude
        int_point.lng = file_exif.gps.longitude
      end
    end
  end

end
