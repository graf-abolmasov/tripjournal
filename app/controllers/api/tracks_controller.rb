class Api::TracksController < Api::ApplicationController

  respond_to :json, only: :index
  respond_to :gpx,  only: :show

  def index
    @tracks = Track.where(trip_id: params[:trip_id]).order(updated_at: :desc).select(:id, :geojson_lq, :updated_at)
    if @tracks.blank? || stale?(last_modified: @tracks.first.updated_at.utc, etag: @tracks.first.cache_key)
      respond_with @tracks
    end
  end

  # Download as GPX
  def show
    @track = Track.find(params[:id])
    respond_with @track
  end

end
