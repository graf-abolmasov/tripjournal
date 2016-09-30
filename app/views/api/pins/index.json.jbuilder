json.array! @notes do |pin|
  json.(pin, :id, :lat, :lng, :image_url)
  json.author pin.traveler.nickname
end