class Api::PinsController < Api::ApplicationController

  def index
    @notes = Note.with_location.chronologically_ordered.includes(:traveler).all
    respond_with @notes
  end

end
