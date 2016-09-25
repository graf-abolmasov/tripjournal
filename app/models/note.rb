class Note < ApplicationRecord

  enum kind: [ :text, :photo ]

  belongs_to :trip

  scope :with_location, -> { where('lat is not null').where('lng is not null') }

end
