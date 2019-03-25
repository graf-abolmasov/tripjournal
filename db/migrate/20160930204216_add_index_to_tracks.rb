# frozen_string_literal: true

class AddIndexToTracks < ActiveRecord::Migration[5.0]
  def change
    add_index :tracks, :updated_at
  end
end
