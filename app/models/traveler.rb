class Traveler < ApplicationRecord

  devise :database_authenticatable,
         authentication_keys: [:nickname]

  has_many :int_points, dependent: :delete_all

  scope :with_instagram, -> { where.not(instagram_token: nil) }
end
