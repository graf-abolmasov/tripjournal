json.array! @tracks do |track|
  json.id track.id
  json.type 'FeatureCollection'
  json.features [track.geojson_lq]
end