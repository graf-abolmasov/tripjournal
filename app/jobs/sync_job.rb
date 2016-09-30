class SyncJob < ActiveJob::Base
  queue_as :default

  def perform
    Traveler.all.each do |t|
      t.import_from_instagram
    end
  end
end
