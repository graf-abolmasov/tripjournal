# frozen_string_literal: true

class AddHotToPoints < ActiveRecord::Migration[5.1]
  def up
    add_reference :points, :trip, index: true, foreign_key: true
    execute 'update points set trip_id = (select trip_id from tracks where tracks.id = points.track_id)'
    change_column_null(:tracks, :trip_id, false)
  end

  def down
    remove_column(:points, :trip_id)
    change_column_null(:tracks, :trip_id, true)
  end
end
