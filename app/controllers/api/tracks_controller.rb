class Api::TracksController < Api::ApplicationController

  def index
    @tracks = Track.order(id: :desc).limit(50)
    respond_with @tracks
  end

end
