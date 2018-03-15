class HomeController < ApplicationController

  layout false

  def index
    push_to_js_env(hot_point: {lat: hot_point.lat.to_f, lng: hot_point.lng.to_f }, trip: @current_trip)
  end

  private

  def hot_point
    @hot_point ||= @current_trip.points.hot.last ||
                   @current_trip.points.order(created_at: :desc).first ||
                   @current_trip.int_points.with_location.order(created_at: :desc).first ||
                   Point.new(lat: 53.1958769, lng: 50.1283811)
  end

end
