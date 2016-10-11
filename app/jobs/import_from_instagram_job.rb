class ImportFromInstagramJob < ActiveJob::Base
  queue_as :default

  def perform
    Traveler.with_instagram.each do |t|
      InstagramGrabber.new(t).run
    end
  end
end
