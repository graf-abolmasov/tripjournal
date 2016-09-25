class Trip < ApplicationRecord

  validates :name, :description, :length, presence: true

  has_many :tracks
  has_many :notes

end
