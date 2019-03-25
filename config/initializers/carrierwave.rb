# frozen_string_literal: true

CarrierWave.configure do |config|
  config.cache_dir = "#{Rails.root}/tmp/uploads"
end
