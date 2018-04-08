class Api::ApplicationController < ActionController::API
  include ActionController::Caching
  include CustomDomainSupport

  before_action :ensure_current_trip

  respond_to :json
end
