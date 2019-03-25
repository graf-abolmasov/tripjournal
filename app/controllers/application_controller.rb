# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include CustomDomainSupport

  protect_from_forgery with: :exception
end
