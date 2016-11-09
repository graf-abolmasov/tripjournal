namespace :tj do
  namespace :reset do
    task points: :environment do
      Point.delete_all
    end

    task tracks: :environment do
      Track.delete_all
    end

    task int_points: :environment do
      IntPoint.delete_all
    end

    task all: [:points, :tracks, :int_points]
  end
end
