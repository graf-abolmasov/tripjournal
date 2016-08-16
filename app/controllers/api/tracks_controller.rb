class Api::TracksController < Api::ApplicationController

  def index
    @tracks = Track.order(id: :desc).all
    respond_with @tracks
  end

end
