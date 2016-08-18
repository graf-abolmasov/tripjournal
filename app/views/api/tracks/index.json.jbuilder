json.type 'FeatureCollection'
json.features @tracks.map(&:geojson_hq)
