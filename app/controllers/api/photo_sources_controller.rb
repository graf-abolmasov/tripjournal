class Api::PhotoSourcesController < Api::ApplicationController
  def index
    @photo_sources = PhotoSource.inverse_chronologically_sorted.all
    respond_with @photo_sources
  end

  def create
    @photo_source = PhotoSource.create!(point_params)
    IntPointFactory.from_photo(@photo_source, @current_trip)
    respond_with @photo_source, location: nil
  end

  private

  def point_params
    params.permit(:traveler_id, :cl_public_id, meta: {})
  end
end
