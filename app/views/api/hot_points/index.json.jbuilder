# frozen_string_literal: true

json.array! @points do |p|
  json.lat p.lat&.to_f
  json.lng p.lng&.to_f
end
