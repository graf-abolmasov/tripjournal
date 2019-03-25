# frozen_string_literal: true

class Point < ApplicationRecord
  belongs_to :trip
  belongs_to :track, optional: true

  scope :hot, -> { where(track_id: nil).order(id: :asc) }

  def x
    lat.to_f
  end

  def y
    lng.to_f
  end

  def distance_to(other_point)
    fi1 = to_rad(lat)
    fi2 = to_rad(other_point.lat)
    l1 = to_rad(lng)
    l2 = to_rad(other_point.lng)
    spherical_distance(fi1, fi2, l1, l2)
  rescue StandardError
    99_999
  end

  def time_diff(other_point)
    ((created_at - other_point.created_at) / 1.hour).abs
  end

  private

  def spherical_distance(fi1, fi2, lng1, lng2)
    111.2 * Math.acos(Math.sin(fi1) * Math.sin(fi2) + Math.cos(fi1) * Math.cos(fi2) * Math.cos(lng2 - lng1))
  end

  def to_rad(deg)
    deg * Math::PI / 180.0
  end
end
