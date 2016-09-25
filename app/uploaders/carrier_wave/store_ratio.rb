module CarrierWave
  module StoreRatio
    def store_ratio
      if file && model
        width, height = ::MiniMagick::Image.open(file.file)[:dimensions]
        model.send :"#{mounted_as}_ratio=", width.to_f / height.to_f
      end
    end
  end
end