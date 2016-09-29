#!/usr/bin/env ruby
require 'gpx'
require 'net/http'
require 'ruby-progressbar'

host = 'localhost:3000'

gpx = GPX::GPXFile.new(:gpx_file => 'track.gpx')
points = gpx.tracks.first.points
progress = ProgressBar.create(total: points.length, format: '%a %B %p%% %r points/sec')
points.each do |point|
  uri = URI("http://#{host}/track?lat=#{point.lat}&lng=#{point.lon}")
  Net::HTTP.get(uri)
  progress.increment
end