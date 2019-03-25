# frozen_string_literal: true

class Track::Ops::AppendPointsXYJob < ActiveJob::Base
  queue_as :default

  def perform(track_id, points)
    track = Track::Processing.find(track_id)
    points = points.map(&:symbolize_keys)
    Track::Ops::AppendPointsXY.execute(track, points)
    track.becomes!(Track).save
  end
end
