# frozen_string_literal: true

class IntPoint::Ops::CreateFromInstagram
  class << self
    def execute(source)
      IntPoint.create(
        trip: ::Trip.find_by(name: source.tags) || ::Trip.last,
        source: source,
        traveler: source.traveler,
        kind: source.kind,
        title: source.title,
        source_url: source.original_media_url,
        created_at: source.created_at,
        lat: source.lat,
        lng: source.lng,
        cl_image_id: upload_image(source),
        cl_video_id: source.video? ? upload_video(source) : nil
      )
    end

    private

    def upload_image(source)
      upload(source.original_image_url, tags: source.tags, resource_type: :image)
    end

    def upload_video(source)
      upload(source.original_video_url, tags: source.tags, resource_type: :video)
    end

    def upload(remote_url, resource_type:, tags: [], context: Rails.env)
      cl_resource = Cloudinary::Uploader.upload(
        remote_url,
        tags: tags,
        resource_type: resource_type,
        context: context
      )
      cl_resource['public_id']
    end
  end
end
