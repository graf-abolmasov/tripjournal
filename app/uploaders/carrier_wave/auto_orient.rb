module CarrierWave
  module AutoOrient
    def auto_orient
      manipulate! do |img|
        img.tap(&:auto_orient)
      end
    end
  end
end