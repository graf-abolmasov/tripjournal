module SetupCurrentTrip
  extend ActiveSupport::Concern

  included do
    helper_method :custom_domain?, :current_trip_id

    prepend_before_action :detect_custom_domain
  end

  def current_shop_id
    @current_trip.try(:id)
  end

  def detect_custom_domain
    @current_trip = find_by_param || find_by_custom_domain

    if @current_trip.blank?
      redirect_to '/pick-a-trip'
    end
  end

  def find_by_param
    Trip.find_by(id: params[:trip_id])
  end

  def find_by_custom_domain
    host = request.host
    host_with_port = request.host_with_port
    domain_variants = [host, host_with_port, de_www(host), de_www(host_with_port)]
    ::Trip.where(custom_domain: domain_variants).take
  end

  private

  def de_www(host)
    if host.starts_with?('www.')
      host[4..-1]
    else
      host
    end
  end
end
