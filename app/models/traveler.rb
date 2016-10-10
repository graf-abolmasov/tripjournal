class Traveler < ApplicationRecord

  has_many :notes

  scope :with_instagram, -> { where.not(instagram_token: nil) }

  def import_from_instagram
    return if instagram_token.blank?

    photos = instagram_client.user_recent_media
    return if photos.empty?

    photos.each do |photo|
      InstagramSource.find_or_create_by(instagram_media_id: photo.id) do |instagram_source|
        instagram_source.traveler = self
        instagram_source.title = photo.caption.try(:text)
        instagram_source.original_image_url = photo.images.standard_resolution.url
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
    @client ||= Instagram.client(access_token: instagram_token)
  end

end
