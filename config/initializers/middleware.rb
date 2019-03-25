# frozen_string_literal: true

Rails.application.configure do
  config.middleware.delete ::Rack::Sendfile
end
