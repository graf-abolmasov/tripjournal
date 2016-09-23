class Note < ActiveRecord::Base

  enum kind: [ :text, :photo ]

  scope :with_location, -> { where('lat is not null').where('lng is not null') }

end
