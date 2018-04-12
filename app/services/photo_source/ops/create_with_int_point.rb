class PhotoSource::Ops::CreateWithIntPoint

  def self.execute(traveler, trip, params)
    photo_source = PhotoSource.create(params) do |ps|
      ps.traveler = traveler
    end
    if photo_source.persisted?
      IntPoint::Ops::CreateFromPhoto.execute(photo_source, trip)
    end
    photo_source
  end

end