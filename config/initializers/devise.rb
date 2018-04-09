# frozen_string_literal: true

Devise.setup do |config|
  require 'devise/orm/active_record'

  config.authentication_keys = [:nickname]
  config.case_insensitive_keys = [:nickname]
  config.strip_whitespace_keys = [:nickname]
  config.skip_session_storage = [:http_auth]
  config.stretches = Rails.env.test? ? 1 : 11
  config.sign_out_via = :delete

  # require 'devise/strategies/json_web_token'
  # config.warden do |manager|
  #   manager.strategies.add(:jwt, Devise::Strategies::JsonWebToken)
  #   manager.default_strategies(scope: :user).unshift :jwt
  # end
end
