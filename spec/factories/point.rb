FactoryBot.define do
  factory :point do
    track
    trip
    lat -> { rand }
    lng -> { rand }
  end
end