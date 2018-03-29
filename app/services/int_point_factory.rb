class IntPointFactory

  class << self
    def from_instagram(inst_source)
      IntPoint.create! do |int_point|
        int_point.trip = Trip.find_by(name: inst_source.tags) || Trip.last
        int_point.source = inst_source
        int_point.traveler = inst_source.traveler

        int_point.kind = inst_source.kind
        int_point.title = inst_source.title
        int_point.source_url = inst_source.original_media_url
        int_point.created_at = inst_source.created_at

        int_point.lat = inst_source.lat
        int_point.lng = inst_source.lng

        int_point.cl_image_id = upload_image(inst_source.original_image_url, tags: inst_source.tags)

        if inst_source.video?
          int_point.cl_video_id = upload_video(inst_source.original_video_url, tags: inst_source.tags)
        end
      end
    end

    def from_photo(photo_source, trip)
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

    def upload_image(remote_url, tags: [], context: Rails.env)
      cl_image = Cloudinary::Uploader.upload(remote_url, tags: tags, context: context)
      cl_image['public_id']
    end

    def upload_video(remote_url, tags: [], context: Rails.env)
      cl_video = Cloudinary::Uploader.upload(remote_url, tags: tags, resource_type: :video, context: context)
      cl_video['public_id']
    end
  end
end