class Api::TracksController < Api::ApplicationController

  respond_to :json, only: :index
  respond_to :gpx,  only: :show

  def index
    @tracks = Track.where(trip_id: params[:trip_id]).order(id: :desc).all
    respond_with @tracks
  end

  # Download as GPX
  def show
    @track = Track.find(params[:id])
    respond_with @track
  end

end
