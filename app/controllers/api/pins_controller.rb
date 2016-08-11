class Api::PinsController < ApplicationController

  def index
    @notes = Note.where('lat is not null').where('lng is not null')
  end

end
