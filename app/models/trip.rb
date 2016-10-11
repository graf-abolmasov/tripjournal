class Trip < ApplicationRecord

  validates :name, :description, :length, presence: true

  has_many :tracks
  has_many :int_points

end
