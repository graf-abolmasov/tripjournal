class Note < ApplicationRecord

  enum kind: [ :text, :photo ]

  belongs_to :trip

  scope :with_location, -> { where.not(lat: nil).where.not(lng: nil) }

end
