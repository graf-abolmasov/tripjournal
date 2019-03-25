# frozen_string_literal: true

json.array! @int_points do |int_point|
  json.call(int_point, :id, :kind, :image_big_url, :image_thumb_url, :video_url)
  json.author int_point.traveler.nickname
  json.lat int_point.lat&.to_f
  json.lng int_point.lng&.to_f
end
