class Api::TripsController < Api::ApplicationController

  skip_before_action :detect_custom_domain

  def index
    @trips = Trip.order(created_at: :desc).all
    respond_with @trips
  end

  def show
    @trip = Trip.find(params[:id])
    respond_with @trip
  end
end
