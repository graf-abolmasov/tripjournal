# frozen_string_literal: true

json.call(@int_point, :id, :image_thumb_url, :traveler_id, :trip_id)
json.author @int_point.traveler.nickname
json.trip @int_point.trip.name
json.lat @int_point.lat&.to_f
json.lng @int_point.lng&.to_f
