# frozen_string_literal: true

class Api::TracksController < Api::ApplicationController
  respond_to :json, only: %i[index create]
  respond_to :gpx,  only: :show
  respond_to :geojson, only: [:index]

  def index
    @tracks = @current_trip.tracks.order(updated_at: :desc).select(:id, :type, :geojson_lq, :updated_at)
    respond_with @tracks if @tracks.blank? || stale?(@tracks.first)
  end

  def create
    @tracks = Track::Ops::Create.execute(@current_trip, params)
    respond_with @tracks, location: nil
  end

  # Download as GPX
  def show
    @track = Track.find(params[:id])
    respond_with @track
  end

  private

  def track_params
    params.require(:track).permit(:file, :remote_url)
  end
end
