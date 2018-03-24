class PhotoSource < ApplicationRecord

  belongs_to :traveler

  validates :file, presence: true

  mount_uploader :file, PhotoUploader

  serialize :file_exif

end
