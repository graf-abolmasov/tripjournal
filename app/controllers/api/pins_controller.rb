class Api::PinsController < ApplicationController

  def index
    @notes = Note.where('latlng is not null')
  end

end
