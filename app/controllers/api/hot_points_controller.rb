class Api::HotPointsController < Api::ApplicationController

  def index
    @points = Point.hot_points.all
    respond_with @points
  end

end
