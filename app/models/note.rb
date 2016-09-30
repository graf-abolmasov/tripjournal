class Note < ApplicationRecord

  belongs_to :trip
  belongs_to :traveler

  belongs_to :source, polymorphic: true

  scope :with_location, -> { where.not(lat: nil).where.not(lng: nil) }
  scope :chronologically_ordered, -> { order(created_at: :asc) }

end
