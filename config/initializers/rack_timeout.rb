# frozen_string_literal: true

Rack::Timeout.timeout = Rails.env.production? && 60
