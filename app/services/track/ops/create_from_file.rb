# frozen_string_literal: true

class Track::Ops::CreateFromFile
  SIZE_THRESHOLD = 150_000 # 150Kb

  class << self
    def execute(trip, params)
      file = params[:file].tempfile
      process_async = file.size > SIZE_THRESHOLD
      tracks = read_tracks_from_file(file.path)
      tracks.map do |points|
        if process_async
          process_big_track(trip, points)
        else
          process_small_track(trip, points)
        end
      end
    end

    private

    def process_small_track(trip, points)
      Track.transaction do
        new_track = Track.create(trip: trip, created_at: points.first[:created_at])
        Track::Ops::AppendPointsXY.execute(new_track, points)
        new_track
      end
    end

    def process_big_track(trip, points)
      new_track = Track::Processing.create(trip: trip, created_at: points.first[:created_at])
      Track::Ops::AppendPointsXY.execute_async(new_track, points)
      new_track
    end

    def read_tracks_from_file(filename)
      ext = filename[-3..-1]
      if %w[kmz kml].include?(ext)
        Track::Utils::KmlFile.read(filename)
      elsif ext == 'gpx'
        Track::Utils::GpxFile.read(filename)
      else
        raise 'Unsupported format'
      end
    end
  end
end
