Rails.application.configure do
  config.middleware.delete ::Rack::Sendfile
end