class Api::IntPointsController < Api::ApplicationController

  def index
    @int_points = @current_trip.int_points.inverse_chronologically_ordered.all.includes(:traveler)
    respond_with @int_points
  end

end
