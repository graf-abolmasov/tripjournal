# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

ruby '2.5.5'

gem 'rails', '~> 5.2.0'

gem 'bootsnap', require: false
gem 'bulk_insert'
gem 'carrierwave', '>= 1.0.0.beta', '< 2.0'
gem 'clockwork'
gem 'devise'
gem 'dotenv-rails'
gem 'jbuilder', '~> 2.5'
gem 'jwt'
gem 'mini_magick'
gem 'oj'
gem 'oj_mimic_json'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.7'
gem 'puma_worker_killer'
gem 'rack-timeout'
gem 'redis', '~> 3.0'
gem 'responders', '~> 2.0'
gem 'sidekiq'
gem 'slim-rails'
gem 'webpacker', '3.2.1'

# SaaS
gem 'cloudinary'

# Business logic
gem 'exifr'
gem 'geo_coord'
gem 'gpx'
gem 'instagram'
gem 'nokogiri'
gem 'ruby-progressbar'
gem 'rubyzip'
gem 'simplify_rb'

group :development do
  gem 'awesome_print'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :development, :test do
  gem 'byebug', platform: :mri
  gem 'capybara', '~> 2.13'
  gem 'factory_bot_rails'
  gem 'pry'
  gem 'pry-rails'
  gem 'selenium-webdriver'
end

group :test do
  gem 'rspec-rails'
end
