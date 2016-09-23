class Api::PinsController < Api::ApplicationController

  def index
    @notes = Note.with_location.all
    respond_with @notes
  end

end
