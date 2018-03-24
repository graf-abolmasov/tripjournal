class InstagramSource < ApplicationRecord

  enum kind: {image: 0, video: 10}

  belongs_to :traveler

end
