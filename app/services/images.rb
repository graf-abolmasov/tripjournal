# frozen_string_literal: true

class Images
  class << self
    def original_url(public_id)
      Cloudinary::Utils.cloudinary_url(public_id, format: 'jpg')
    end

    def big_url(public_id)
      Cloudinary::Utils.cloudinary_url(public_id, width: 1600, height: 1600, crop: :fit, format: 'jpg')
    end

    def thumb_url(public_id)
      Cloudinary::Utils.cloudinary_url(public_id, width: 600, height: 600, crop: :fit, format: 'jpg')
    end

    private

    def with_public_id(public_id)
      return nil if public_id.blank?

      yield(public_id)
    end
  end
end
