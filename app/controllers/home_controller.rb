class HomeController < ApplicationController

  layout false

  def index
    push_to_js_env(hot_point: {lat: hot_point.lat.to_f, lng: hot_point.lng.to_f })
  end

  private

  def hot_point
    @hot_point ||= Point.hot_points.reorder(created_at: :desc).first ||
                   Note.with_location.order(created_at: :desc).first ||
                   Point.new(lat: 53.1958769, lng: 50.1283811)
  end

end
