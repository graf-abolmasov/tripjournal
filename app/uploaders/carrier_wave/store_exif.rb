module CarrierWave
  module StoreExif
    def store_exif
      if file.present? && file.content_type == 'image/jpeg' && model.present?
        model.send("#{mounted_as}_exif=", EXIFR::JPEG.new(file.file).exif)
      end
    end
  end
end