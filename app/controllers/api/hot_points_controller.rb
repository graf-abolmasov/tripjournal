class Api::HotPointsController < Api::ApplicationController

  def index
    @points = @current_trip.points.hot.all
    respond_with @points
  end

end
