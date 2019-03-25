# frozen_string_literal: true

class IntPoint::Ops::CreateFromPhoto
  class << self
    def execute(photo_source, trip)
      IntPoint.create do |int_point|
        int_point.trip = trip
        int_point.source = photo_source
        int_point.traveler = photo_source.traveler

        int_point.source_url = photo_source.meta['url']
        int_point.created_at = photo_source.created_at

        int_point.lat = photo_source.lat
        int_point.lng = photo_source.lng

        int_point.cl_image_id = photo_source.cl_public_id
      end
    end
  end
end
