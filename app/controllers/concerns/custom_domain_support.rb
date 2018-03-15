module CustomDomainSupport
  extend ActiveSupport::Concern

  included do
    helper_method :custom_domain?, :current_trip_id
  end

  def current_trip_id
    @current_trip.try(:id)
  end

  def ensure_current_trip
    @current_trip = find_by_param || find_by_custom_domain

    if @current_trip.blank?
      redirect_to '/welcome'
    end
  end

  private

  def find_by_param
    Trip.find_by(id: params.delete(:trip_id))
  end

  def find_by_custom_domain
    host = request.host
    host_with_port = request.host_with_port
    domain_variants = [host, host_with_port, de_www(host), de_www(host_with_port)]
    ::Trip.where(custom_domain: domain_variants).take
  end

  def de_www(host)
    if host.starts_with?('www.')
      host[4..-1]
    else
      host
    end
  end
end
