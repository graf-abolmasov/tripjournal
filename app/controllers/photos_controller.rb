class PhotosController < ApplicationController

  def new

  end

  def create
    Array.wrap(params[:files]).each do |file|
      PhotoSource.create(file: file, author: params[:author])
    end
    redirect_to new_photo_path
  end

end