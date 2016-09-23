class PointsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'points'
  end
end
