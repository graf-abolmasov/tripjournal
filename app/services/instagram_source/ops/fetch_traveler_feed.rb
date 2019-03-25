# frozen_string_literal: true

class InstagramSource::Ops::FetchTravelerFeed
  class << self
    def execute(traveler)
      inst_client = ::Instagram.client(access_token: traveler.instagram_token)
      photos = inst_client.user_recent_media
      return if photos.empty?

      photos.map do |photo|
        InstagramSource.find_by(instagram_media_id: photo.id) || create(photo, traveler)
      end
    end

    private

    def create(post, traveler)
      result = InstagramSource.create do |source|
        source.instagram_media_id = post.id
        source.traveler = traveler
        source.kind = video?(post) ? 'video' : 'image'
        source.title = post.caption.try(:text)
        source.original_image_url = post.images.standard_resolution.url
        source.original_video_url = post.videos.standard_resolution.url if video?(post)
        source.original_media_url = post.link
        source.tags = post.tags
        source.created_at = Time.at(post.created_time.to_i)
        if location_present?(post)
          source.lat = post.location.latitude
          source.lng = post.location.longitude
        end
      end
      IntPoint::Ops::CreateFromInstagram.execute(result) if result.persisted?
      result
    end

    def video?(post)
      post.type == 'video'
    end

    def location_present?(post)
      post.location.present? && post.location.latitude.present? && post.location.longitude.present?
    end
  end
end
