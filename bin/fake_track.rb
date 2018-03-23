#!/usr/bin/env ruby
require 'gpx'
require 'net/http'
require 'ruby-progressbar'
require 'byebug'
require_relative '../app/services/kml_file'
require_relative '../app/services/gpx_file'
require_relative '../app/services/tracks_factory'

host = 'http://go2snow.test:3000'

tracks = TracksFactory.send(:read_tracks_from_file, ARGV[0])

tracks.each do |track|
  progress = ProgressBar.create(total: track.length, format: '%a %B %p%% %r points/sec')
  track.each do |point|
    uri = URI("#{host}/track?lat=#{point[:x]}&lng=#{point[:y]}")
    Net::HTTP.get(uri)
    sleep(0.1)
    progress.increment
  end
end
