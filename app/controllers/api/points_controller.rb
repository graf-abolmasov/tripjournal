class Api::PointsController < Api::ApplicationController

  def create
    @point = Point.create(point_params)
    respond_with @point
  end

  private

  def point_params
    params.permit(:lat, :lng, :speed, :alt, :hdop)
  end
end
