class IntPoint < ApplicationRecord

  enum kind: {image: 0, video: 10, text: 20}

  belongs_to :trip
  belongs_to :traveler

  belongs_to :source, polymorphic: true

  scope :with_location, -> { where.not(lat: nil).where.not(lng: nil) }
  scope :inverse_chronologically_ordered, -> { order(created_at: :desc) }

  def image_url
    return nil if cl_image_id.blank?
    Cloudinary::Utils.cloudinary_url(cl_image_id, format: 'jpg')
  end

  def video_url
    return nil if cl_video_id.blank?
    Cloudinary::Utils.cloudinary_url(cl_video_id, format: 'mp4')
  end

end
