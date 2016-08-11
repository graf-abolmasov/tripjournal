class Api::TracksController < Api::ApplicationController

  def index
    @tracks = Track.limit(50)
  end

end
