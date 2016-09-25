#!/usr/bin/env ruby
require 'gpx'
require 'net/http'
require 'ruby-progressbar'

host = 'localhost:3000'

gpx = GPX::GPXFile.new(:gpx_file => 'track.gpx')
points = gpx.tracks.first.points
progress = ProgressBar.create(total: points.length, format: '%a %B %p%% %r points/sec')
points.each do |point|
  uri = URI("http://#{host}/api/points")
  Net::HTTP.post_form(uri, {lat: point.lat, lng: point.lon})
  progress.increment
end