class Api::IntPointsController < Api::ApplicationController

  def index
    @int_points = IntPoint.includes(:traveler).inverse_chronologically_ordered.all
    respond_with @int_points
  end

end
