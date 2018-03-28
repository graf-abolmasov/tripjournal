json.array!(@photo_sources) do |photo_source|
  json.(photo_source, :id, :meta, :thumb_url)
end