json.array! @int_points do |intPoint|
  json.(intPoint, :id, :kind, :image_big_url, :image_thumb_url, :video_url)
  json.author intPoint.traveler.nickname
  json.lat intPoint.lat&.to_f
  json.lng intPoint.lng&.to_f
end