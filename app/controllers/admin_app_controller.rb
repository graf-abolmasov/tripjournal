class AdminAppController < ActionController::Base
  include CustomDomainSupport
  include JsEnv

  before_action :ensure_current_trip, only: [:index]

  def index
    push_to_js_env(trip: @current_trip)
  end
end
