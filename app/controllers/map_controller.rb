class MapController < ApplicationController

  DEFAULT_POINT = Point.new(lat: 53.1958769, lng: 50.1283811).freeze

  def index
    @current_position = current_center_point
  end

  private

  def current_center_point
    Point.last ||
    Note.where('lat is not null').where('lng is not null').order(created_at: :desc).first ||
    DEFAULT_POINT
  end

end
