class InstagramGrabber

  def initialize(traveler)
    @traveler = traveler
  end

  def run
    photos = instagram_client.user_recent_media
    return if photos.empty?

    photos.each do |photo|
      InstagramSource.find_or_create_by(instagram_media_id: photo.id) do |instagram_source|
        instagram_source.traveler = @traveler
        instagram_source.kind  = photo.type
        instagram_source.title = photo.caption.try(:text)
        instagram_source.original_image_url = photo.images.standard_resolution.url
        instagram_source.original_video_url = photo.videos.standard_resolution.url if photo.type == 'video'
        instagram_source.original_media_url = photo.link
        instagram_source.created_at = Time.at(photo.created_time.to_i)
        if photo.location.present? && photo.location.latitude.present? && photo.location.longitude.present?
          instagram_source.lat = photo.location.latitude
          instagram_source.lng = photo.location.longitude
        end
      end
    end
  end

  private

  def instagram_client
    @client ||= Instagram.client(access_token: @traveler.instagram_token)
  end

end