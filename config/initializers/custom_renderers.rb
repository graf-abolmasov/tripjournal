# frozen_string_literal: true

ActionController::Renderers.add :gpx do |object, _options|
  self.content_type ||= Mime[:gpx]
  object.to_gpx
end
