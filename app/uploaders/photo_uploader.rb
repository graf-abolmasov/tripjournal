class PhotoUploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick
  include CarrierWave::AutoOrient
  include CarrierWave::StoreRatio
  include CarrierWave::StoreExif

  storage :file

  process :auto_orient
  process :store_ratio
  process :store_exif

  version :thumb do
    process resize_to_fit: [300, 300]
  end

  version :normal do
    process resize_to_fit: [2000, 2000]
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_whitelist
    %w(jpg jpeg png)
  end

end
