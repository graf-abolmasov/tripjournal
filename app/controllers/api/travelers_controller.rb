# frozen_string_literal: true

class Api::TravelersController < Api::ApplicationController
  def index
    @travelers = Traveler.all
    respond_with @travelers
  end
end
