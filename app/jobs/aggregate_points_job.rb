class AggregatePointsJob < ActiveJob::Base
  queue_as :default

  DISTANCE_EPSILON_FOR_NEW_TRACK = ENV.fetch('DISTANCE_EPSILON_FOR_NEW_TRACK', 0.02).to_f
  TIME_EPSILON_FOR_NEW_TRACK = ENV.fetch('TIME_EPSILON_FOR_NEW_TRACK', 12).to_i

  def perform
    PointsAggregator.execute(distance_epsilon_for_new_track: DISTANCE_EPSILON_FOR_NEW_TRACK,
                             time_epsilon_for_new_track: TIME_EPSILON_FOR_NEW_TRACK)
    TracksAggregator.execute(distance_epsilon_for_new_track: DISTANCE_EPSILON_FOR_NEW_TRACK,
                             time_epsilon_for_new_track: TIME_EPSILON_FOR_NEW_TRACK)
  end

end
