class Api::PinsController < Api::ApplicationController

  def index
    @notes = Note.where('lat is not null').where('lng is not null')
    respond_with @notes
  end

end
