namespace :tj do
  task sync: :environment do
    SyncJob.perform_later
  end

  task aggregate_points: :environment do
    AggregatePointsJob.perform_later
  end

  task init: :environment do
    InstagramSource.all.each(&:init!)
  end

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

    task sources: :environment do
      InstagramSource.all.each { |s| s.update_attribute(:last_media_id, nil) }
    end

    task all: [:points, :tracks, :int_points, :sources]
  end
end
