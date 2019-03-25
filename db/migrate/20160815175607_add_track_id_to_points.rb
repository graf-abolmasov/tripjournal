# frozen_string_literal: true

class AddTrackIdToPoints < ActiveRecord::Migration[4.2]
  def change
    add_reference :points, :track, foreign_key: true
  end
end
