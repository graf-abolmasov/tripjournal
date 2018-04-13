# frozen_string_literal: true

class Api::IntPointsController < Api::ApplicationController
  def index
    @int_points = @current_trip.int_points.inverse_chronologically_sorted.all.includes(:traveler, :trip)
    respond_with @int_points
  end

  def update
    @int_point = IntPoint.find(params[:id])
    @int_point.update_attributes(int_point_params)
    respond_with @int_point
  end

  def destroy
    @int_point = IntPoint.find(params[:id])
    @int_point.destroy
    respond_with @int_point
  end

  private

  def int_point_params
    params[:int_point].permit!
  end
end
