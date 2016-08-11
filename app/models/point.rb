class Point < ActiveRecord::Base

  after_create :notify

  def to_x_y
    {x: self.lat, y: self.lng}
  end

  private

  def notify
    return if ENV['DISABLE_ONLINE_UPDATES'].present?
    Pusher["tj.#{Rails.env}"].trigger('tj:map:update_current_position', attributes.to_json )
  end
end
