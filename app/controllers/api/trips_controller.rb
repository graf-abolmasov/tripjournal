class Api::TripsController < Api::ApplicationController

  def index
    @trips = Trip.order(created_at: :desc).all
    respond_with @trips
  end

  def show
    @trip = Trip.find(params[:id])
    respond_with @trip
  end

end
