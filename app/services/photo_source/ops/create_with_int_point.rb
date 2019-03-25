# frozen_string_literal: true

class PhotoSource::Ops::CreateWithIntPoint
  def self.execute(traveler, trip, params)
    photo_source = PhotoSource.create(params) do |ps|
      ps.traveler = traveler
    end
    IntPoint::Ops::CreateFromPhoto.execute(photo_source, trip) if photo_source.persisted?
    photo_source
  end
end
