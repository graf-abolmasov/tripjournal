class Traveler < ApplicationRecord

  has_many :int_points

  scope :with_instagram, -> { where.not(instagram_token: nil) }

end
