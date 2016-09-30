class InstagramSource < ApplicationRecord

  belongs_to :traveler

  after_save :create_note, on: :create

  private

  def create_note
    Note.create do |note|
      note.source = self
      note.traveler = traveler
      note.title = title
      note.image_url = original_image_url
      note.source_url = original_media_url
      note.created_at = created_at
      note.lat = lat
      note.lng = lng
    end
  end
end
