ActionController::Renderers.add :gpx do |object, options|
  self.content_type ||= Mime[:gpx]
  object.to_gpx
end