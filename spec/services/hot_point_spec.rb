require "rails_helper"

describe HotPoint do
  let!(:trip) { create :trip }
  let!(:default_point) { [53.1958769, 50.1283811] }

  subject { described_class.for_trip(trip) }

  context 'when not points' do
    it { expect([subject.lat, subject.lng]).to eq(default_point) }
  end

  context 'when track w/o points' do
    let(:track) { create :track, trip: trip }
    it { expect([subject.lat, subject.lng]).to eq(default_point) }
  end

  context 'when track w/o points' do
    let!(:track) { create :track, trip: trip }
    let!(:point) { create :point, track: track, trip: trip }

    it { expect(subject).to eq(point) }
  end
end