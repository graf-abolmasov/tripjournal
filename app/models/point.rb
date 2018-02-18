class Point < ApplicationRecord

  belongs_to :trip
  belongs_to :track

  scope :hot, -> { where(track_id: nil).order(id: :asc) }

  after_commit :notify, on: :create

  def to_x_y
    {x: self.lat.to_f, y: self.lng.to_f}
  end

  def distance_to(other_point)
    fi1 = to_rad(self.lat)
    fi2 = to_rad(other_point.lat)
    l1 = to_rad(self.lng)
    l2 = to_rad(other_point.lng)
    111.2 * Math.acos(Math.sin(fi1) * Math.sin(fi2) + Math.cos(fi1) * Math.cos(fi2) * Math.cos(l2-l1))
  rescue
    99999
  end

  def time_diff(other_point)
    ((self.created_at - other_point.created_at) / 1.hour).abs
  end

  private

  def to_rad(deg)
    deg * Math::PI / 180.0
  end

  def notify
    PointsChannel.notify(self)
  end

end
