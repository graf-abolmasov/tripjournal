class Api::TracksController < Api::ApplicationController

  respond_to :gpx

  def index
    @tracks = Track.order(id: :desc).all
    respond_with @tracks
  end

  def show
    @track = Track.find(params[:id])
    respond_with @track
  end

end
