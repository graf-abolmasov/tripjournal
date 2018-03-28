class InstagramGrabber

  class << self
    def execute(traveler)
      inst_client = Instagram.client(access_token: traveler.instagram_token)
      photos = inst_client.user_recent_media
      return if photos.empty?

      photos.each do |photo|
        InstagramSource.find_by(instagram_media_id: photo.id) || create(photo, traveler)
      end
    end

    private

    def create(photo, traveler)
      inst_source = InstagramSource.create do |inst_source|
        inst_source.instagram_media_id = photo.id
        inst_source.traveler = traveler
        inst_source.kind  = photo.type == 'video' ? 'video' : 'image'
        inst_source.title = photo.caption.try(:text)
        inst_source.original_image_url = photo.images.standard_resolution.url
        inst_source.original_video_url = photo.videos.standard_resolution.url if photo.type == 'video'
        inst_source.original_media_url = photo.link
        inst_source.tags = photo.tags
        inst_source.created_at = Time.at(photo.created_time.to_i)
        if photo.location.present? && photo.location.latitude.present? && photo.location.longitude.present?
          inst_source.lat = photo.location.latitude
          inst_source.lng = photo.location.longitude
        end
      end
      IntPointFactory.from_instagram(inst_source)
    end
  end
end