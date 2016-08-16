class AddTrackIdToPoints < ActiveRecord::Migration
  def change
    add_reference :points, :track, foreign_key: true
  end
end
