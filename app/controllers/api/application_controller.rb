class Api::ApplicationController < ActionController::API
  include ActionController::Caching
  include SetupCurrentTrip

  respond_to :json

end
