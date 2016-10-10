class ImportFromInstagramJob < ActiveJob::Base
  queue_as :default

  def perform
    Traveler.with_instagram.each do |t|
      t.import_from_instagram
    end
  end
end
