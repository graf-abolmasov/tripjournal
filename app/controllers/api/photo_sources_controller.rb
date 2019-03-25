# frozen_string_literal: true

class Api::PhotoSourcesController < Api::ApplicationController
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception

  before_action :authenticate_traveler!

  def index
    @photo_sources = PhotoSource.joins(:int_point)
                                .where(int_points: { trip_id: @current_trip.id })
                                .where(traveler: current_traveler)
                                .inverse_chronologically_sorted
                                .all
    respond_with @photo_sources
  end

  def create_with_int_point
    @photo_source = PhotoSource::Ops::CreateWithIntPoint.execute(current_traveler, @current_trip, photo_source_params)
    respond_with @photo_source, location: nil
  end

  private

  def photo_source_params
    params.permit(:cl_public_id, meta: {})
  end
end
