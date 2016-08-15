require 'rubygems'
require 'clockwork'

require_relative 'boot'
require_relative 'environment'

module Clockwork
  handler do |active_job_class|
    active_job_class.constantize.perform_later
  end

  every(15.seconds, 'AggregatePointsJob')
end