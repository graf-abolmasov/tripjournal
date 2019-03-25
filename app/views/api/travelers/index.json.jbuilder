# frozen_string_literal: true

json.array! @travelers do |track|
  json.call(track, :id, :nickname)
end
