class MapController < ApplicationController

  def index
    @current_position = current_center_point
  end

  private

  def current_center_point
    Point.last ||
    Note.where(:lat.ne => nil).where(:lng.ne => nil).first ||
    Point.new(lat: 53.1958769, lng: 50.1283811)
  end

end
