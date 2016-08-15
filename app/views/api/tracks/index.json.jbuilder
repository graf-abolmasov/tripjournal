json.type 'FeatureCollection'
json.features @tracks.map { |t| JSON.parse(t.json) }
