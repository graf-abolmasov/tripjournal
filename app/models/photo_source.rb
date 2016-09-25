class PhotoSource < ApplicationRecord

  validates :author, :file, presence: true

  mount_uploader :file, PhotoUploader

  serialize :file_exif

  after_save :create_note, on: :create

  private

  def create_note
    Note.create do |note|
      note.kind = :photo
      note.image_url = file.normal.url
      note.source_url = file.url
      note.author = author
      note.created_at = created_at
      if file_exif.gps.present?
        note.lat = file_exif.gps.latitude
        note.lng = file_exif.gps.longitude
      end
    end
  end

end
