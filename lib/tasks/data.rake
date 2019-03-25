# frozen_string_literal: true

namespace :tj do
  namespace :data do
    task reprocess_tracks: :environment do
      progress = ProgressBar.create(total: Track.where(geojson_lq: nil).count, format: '%a %B %p%% %r tracks/sec')
      Track.where(geojson_lq: nil).each do |track|
        Point.bulk_insert(:lat, :lng, :track_id, :created_at, :updated_at) do |worker|
          track.geojson_hq['geometry']['coordinates'].map do |coordinates|
            coordinates.each do |coordinate|
              worker.add(lng: coordinate[0], lat: coordinate[1], track_id: track.id, created_at: track.created_at)
            end
          end
        end
        track.reload.recreate_geojson!(skip_hq: true)
        progress.increment
      end
    end
  end
end
