class Api::PointsController < Api::ApplicationController

  def create
    @point = @current_trip.points.create(point_params)
    respond_with @point
  end

  private

  def point_params
    params.permit(:lat, :lng, :speed, :alt, :hdop)
  end
end
