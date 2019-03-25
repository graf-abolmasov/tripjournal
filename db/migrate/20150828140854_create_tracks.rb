# frozen_string_literal: true

class CreateTracks < ActiveRecord::Migration[4.2]
  def change
    create_table :tracks do |t|
      t.text :json

      t.timestamps null: false
    end
  end
end
