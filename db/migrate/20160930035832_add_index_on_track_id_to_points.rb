# frozen_string_literal: true

class AddIndexOnTrackIdToPoints < ActiveRecord::Migration[5.0]
  def change
    add_index :points, :track_id
  end
end
