# frozen_string_literal: true

class CreateInstagramSources < ActiveRecord::Migration[4.2]
  def change
    create_table :instagram_sources do |t|
      t.string     :user_id
      t.string     :last_media_id

      t.timestamps null: false
    end
  end
end
