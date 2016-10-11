class InstagramSource < ApplicationRecord

  enum kind: {image: 0, video: 10}

  belongs_to :traveler

  after_save :create_int_point, on: :create

  private

  def create_int_point
    IntPoint.create do |int_point|
      int_point.source = self
      int_point.kind = kind
      int_point.traveler = traveler
      int_point.title = title
      int_point.image_url = original_image_url
      int_point.video_url = original_video_url
      int_point.source_url = original_media_url
      int_point.created_at = created_at
      int_point.lat = lat
      int_point.lng = lng
    end
  end
end
