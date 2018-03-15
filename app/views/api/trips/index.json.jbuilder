json.array! @trips do |trip|
  json.(trip, :id, :name, :description, :custom_domain)
end
