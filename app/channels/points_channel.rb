# frozen_string_literal: true

class PointsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "points_#{params[:trip_id]}"
  end

  def self.notify(point)
    ActionCable.server.broadcast("points_#{point.trip_id}",
                                 lat: point.lat.to_f,
                                 lng: point.lng.to_f,
                                 alt: point.alt.to_f,
                                 speed: point.speed.to_f,
                                 created_at: point.created_at)
  end
end
