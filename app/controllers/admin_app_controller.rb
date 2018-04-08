class AdminAppController < ApplicationController
  include JsEnv

  before_action :authenticate_traveler!

  before_action :ensure_current_trip, only: [:index]

  def index
    push_to_js_env(trip: @current_trip,
                   traveler: {
                       nickname: current_traveler.nickname
                   })
  end
end
