class Api::TracksController < Api::ApplicationController

  def index
    @tracks = Track.order(id: :desc).limit(50)
  end

end
