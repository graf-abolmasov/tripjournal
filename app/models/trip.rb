class Trip < ApplicationRecord

  validates :name, :description, :length, presence: true

  has_many :tracks, dependent: :destroy
  has_many :int_points, dependent: :delete_all

end
