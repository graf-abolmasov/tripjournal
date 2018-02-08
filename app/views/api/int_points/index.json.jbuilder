json.array! @int_points do |intPoint|
  json.(intPoint, :id, :kind, :image_url, :video_url)
  json.author intPoint.traveler.nickname
  json.lat intPoint.lat&.to_f
  json.lng intPoint.lng&.to_f
end