class ImportController < ApplicationController

  def show

  end

  def track
    Array.wrap(params[:files]).each do |file|
      Track.import(file.tempfile.path)
    end
    redirect_to import_url
  end

  def instagram
    SyncJob.perform_later
  end

end