# frozen_string_literal: true

class IntPoint < ApplicationRecord
  enum kind: { image: 0, video: 10, text: 20 }

  belongs_to :trip
  belongs_to :traveler

  belongs_to :source, polymorphic: true

  scope :with_location, -> { where.not(lat: nil).where.not(lng: nil) }
  scope :inverse_chronologically_sorted, -> { order(created_at: :desc) }

  def image_big_url
    Images.big_url(cl_image_id)
  end

  def image_thumb_url
    Images.thumb_url(cl_image_id)
  end

  def video_url
    return nil if cl_video_id.blank?

    Cloudinary::Utils.cloudinary_url(cl_video_id, resource_type: :video, format: 'mp4')
  end
end
