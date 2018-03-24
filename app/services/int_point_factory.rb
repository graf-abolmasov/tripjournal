class IntPointFactory

  class << self
    def from_instagram(inst_source)
      IntPoint.create do |int_point|
        int_point.source = inst_source
        int_point.kind = inst_source.kind
        int_point.traveler = inst_source.traveler
        int_point.title = inst_source.title
        int_point.image_url = inst_source.original_image_url
        int_point.video_url = inst_source.original_video_url
        int_point.source_url = inst_source.original_media_url
        int_point.created_at = inst_source.created_at
        int_point.lat = inst_source.lat
        int_point.lng = inst_source.lng
      end
    end

    def from_photo(photo_source)
      IntPoint.create do |int_point|
        int_point.source = photo_source
        int_point.traveler = photo_source.traveler
        int_point.image_url = photo_source.file.normal.url
        int_point.source_url = photo_source.file.url
        int_point.created_at = photo_source.created_at
        if photo_source.file_exif.gps.present?
          int_point.lat = photo_source.file_exif.gps.latitude
          int_point.lng = photo_source.file_exif.gps.longitude
        end
      end
    end
  end
end