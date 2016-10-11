json.array! @int_points do |intPoint|
  json.(intPoint, :id, :lat, :lng, :kind, :image_url, :video_url)
  json.author intPoint.traveler.nickname
end