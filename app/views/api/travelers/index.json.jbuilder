json.array! @travelers do |track|
  json.(track, :id, :nickname)
end