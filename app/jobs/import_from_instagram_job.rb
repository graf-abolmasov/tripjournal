class ImportFromInstagramJob < ActiveJob::Base
  queue_as :default

  def perform
    Traveler.with_instagram.each do |t|
      InstagramGrabber.execute(t)
    end
  end
end
