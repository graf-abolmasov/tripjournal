# frozen_string_literal: true

json.array! @trips do |trip|
  json.call(trip, :id, :name, :description, :custom_domain)
end
