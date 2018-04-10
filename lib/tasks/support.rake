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

  namespace :init do
    task :traveler, [:nickname] => :environment do |_, args|
      nickname = args[:nickname]
      raise ArgumentError, 'bundle exec rake "tj:init:traveler[nickname]"' if nickname.blank?
      Traveler.create(nickname: nickname, password: ENV['DEFAULT_PASSWORD'])
    end

    task :trip, [:name, :domain] => :environment do |_, args|
      name = args[:name]
      domain = args[:domain]
      raise ArgumentError, 'bundle exec rake "tj:init:traveler[name, domain]"' if name.blank?
      Trip.create!(name: name, custom_domain: domain)
    end
  end
end
