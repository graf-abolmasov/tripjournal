source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '2.5.0'

gem 'rails', '~> 5.1.4'

gem 'bulk_insert'
gem 'carrierwave', '>= 1.0.0.beta', '< 2.0'
gem 'clockwork'
gem 'dotenv-rails'
gem 'jwt'
gem 'devise'
gem 'jbuilder', '~> 2.5'
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
gem 'instagram'
gem 'nokogiri'
gem 'rubyzip'
gem 'gpx'
gem 'ruby-progressbar'
gem 'simplify_rb'
gem 'geo_coord'

group :development do
  gem 'awesome_print'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :development, :test do
  gem 'byebug', platform: :mri
  gem 'factory_bot_rails'
  gem 'pry'
  gem 'pry-rails'
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
end

group :test do
  gem 'rspec-rails'
end
