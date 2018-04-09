class Api::TracksController < Api::ApplicationController

  respond_to :json, only: [:index, :create]
  respond_to :gpx,  only: :show

  def index
    @tracks = @current_trip.tracks.order(updated_at: :desc).select(:id, :geojson_lq, :updated_at)
    if @tracks.blank? || stale?(last_modified: @tracks.first.updated_at.utc, etag: @tracks.first.cache_key)
      respond_with @tracks
    end
  end

  def create
    @track = TracksFactory.create_from_file(params[:file].tempfile.path, @current_trip)
    respond_with @tracks, location: nil
  end

  # Download as GPX
  def show
    @track = Track.find(params[:id])
    respond_with @track
  end
end
