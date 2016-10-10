class Api::PinsController < Api::ApplicationController

  def index
    @notes = Note.includes(:traveler).inverse_chronologically_ordered.all
    respond_with @notes
  end

end
