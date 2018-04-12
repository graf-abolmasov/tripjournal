class ImportFromInstagramJob < ActiveJob::Base
  queue_as :default

  def perform
    Traveler.with_instagram.each do |t|
      InstagramSource::Ops::FetchTravelerFeed.execute(t)
    end
  end
end
