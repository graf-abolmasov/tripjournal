class Trip < ApplicationRecord

  has_many :tracks, dependent: :delete_all
  has_many :int_points, dependent: :delete_all
  has_many :points, dependent: :delete_all

end
