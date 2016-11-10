class Traveler < ApplicationRecord

  has_many :int_points, dependent: :delete_all

  scope :with_instagram, -> { where.not(instagram_token: nil) }

end
