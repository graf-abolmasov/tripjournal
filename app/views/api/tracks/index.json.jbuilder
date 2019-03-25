# frozen_string_literal: true

json.array! @tracks do |track|
  json.partial!(track)
end
