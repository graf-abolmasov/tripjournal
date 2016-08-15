class Api::PinsController < Api::ApplicationController

  def index
    @notes = Note.where(:lat.ne => nil).where(:lng.ne => nil).all
    respond_with @notes
  end

end
