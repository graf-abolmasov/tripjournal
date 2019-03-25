# frozen_string_literal: true

json.array!(@photo_sources) do |photo_source|
  json.call(photo_source, :id, :meta, :thumb_url)
end
