# frozen_string_literal: true

class Track::Ops::Create
  def self.execute(trip, params)
    if params[:remote_url].present?
      Track::Ops::CreateFromRemoteUrl.execute(trip, params)
    elsif params[:file].present?
      Track::Ops::CreateFromFile.execute(trip, params)
    else
      raise 'No data to create track'
    end
  end
end
