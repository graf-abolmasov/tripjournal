namespace :tj do
  namespace :data do
    task reprocess_tracks: :environment do
      progress = ProgressBar.create(total: Track.count, format: '%a %B %p%% %r tracks/sec')
      Track.all.each do |track|
        Point.transaction do
          points = track.geojson_hq['geometry']['coordinates'].map do |coordinates|
            coordinates.map do |coordinate|
              Point.new(lng: coordinate[0], lat: coordinate[1], created_at: track.created_at)
            end
          end
          track.update_attributes(points: points.first)
        end
        progress.increment
      end
    end
  end
end
