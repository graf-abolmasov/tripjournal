# frozen_string_literal: true

class InstagramSource < ApplicationRecord
  enum kind: { image: 0, video: 10 }

  belongs_to :traveler

  has_one :int_point, dependent: :destroy, foreign_key: :source_id
end
