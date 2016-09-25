class TracksController < ApplicationController

  def new

  end

  def create
    Array.wrap(params[:files]).each do |file|
      TracksFactory.create_from_file(file.tempfile.path)
    end
    redirect_to new_track_path
  end

end