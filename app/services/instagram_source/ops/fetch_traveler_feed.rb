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
      source = create_source(post, traveler)
      IntPoint::Ops::CreateFromInstagram.execute(source) if source.persisted?
      source
    end

    def create_source(post, traveler)
      InstagramSource.create(
        instagram_media_id: post.id,
        traveler: traveler,
        kind: post_kind(post),
        title: post_title(post),
        original_image_url: post_image_url(post),
        original_video_url: post_video_url(post),
        original_media_url: post.link,
        tags: post.tags,
        created_at: Time.at(post.created_time.to_i)
      ) do |source|
        if location_present?(post)
          source.lat = post_lat(post)
          source.lng = post_lng(post)
        end
      end
    end

    def post_kind(post)
      video?(post) ? 'video' : 'image'
    end

    def post_title(post)
      post.caption.try(:text)
    end

    def post_image_url(post)
      post.images.standard_resolution.url
    end

    def post_video_url(post)
      post.videos.standard_resolution.url if video?(post)
    end

    def post_lat(post)
      post.location.latitude
    end

    def post_lng(post)
      post.location.longitude
    end

    def video?(post)
      post.type == 'video'
    end

    def location_present?(post)
      post.location.present? && post.location.latitude.present? && post.location.longitude.present?
    end
  end
end
