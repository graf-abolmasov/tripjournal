class Point < ActiveRecord::Base

  after_create :notify

  def pusher_json
    JSON.dump(
        lat: self.lat.to_f,
        lng: self.lng.to_f,
        alt: self.alt.to_f,
        speed: self.speed.to_f,
        created_at: self.created_at,
    )
  end

  def to_x_y
    {x: self.lat, y: self.lng}
  end

  private

  def notify
    return if ENV['DISABLE_ONLINE_UPDATES'].present?
    Pusher["tj.#{Rails.env}"].trigger('tj:map:update_current_position', pusher_json )
  end
end
