class PublicAppController < ApplicationController
  include JsEnv

  before_action :ensure_current_trip, only: [:index]

  def index
    @hot_point = HotPoint.for_trip(@current_trip)
    push_to_js_env(hot_point: {
                     lat: @hot_point.lat.to_f,
                     lng: @hot_point.lng.to_f },
                   trip: @current_trip)
  end

  def welcome
    @trips = Trip.all
  end
end
