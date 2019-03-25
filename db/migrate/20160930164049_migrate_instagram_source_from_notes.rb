# frozen_string_literal: true

class MigrateInstagramSourceFromNotes < ActiveRecord::Migration[5.0]
  def up
    drop_table :instagram_sources
    create_table :instagram_sources do |t|
      t.string :title
      t.string :instagram_media_id, null: false
      t.string :original_media_url, null: false
      t.string :original_image_url, null: false
      t.decimal :lat
      t.decimal :lng
      t.references :traveler, index: true, foreign_key: true
      t.timestamps
    end

    execute 'insert into instagram_sources (instagram_media_id, original_media_url, original_image_url, created_at, updated_at, traveler_id, title, lat, lng) ' \
            '(select source_id,          source_url,         image_url,          created_at, updated_at, traveler_id, title, lat, lng from notes)'

    remove_column :notes, :kind

    rename_column :notes, :source_id, :original_source_id
    add_column :notes, :source_id, :integer
    add_column :notes, :source_type, :string

    execute 'update notes set source_id = (select id from instagram_sources where notes.original_source_id = instagram_sources.instagram_media_id), ' \
            "source_type = 'InstagramSource'"

    remove_column :notes, :original_source_id
    change_column :notes, :source_id, :integer, null: false
    change_column :notes, :source_type, :string, null: false

    add_index :notes, :created_at
    add_index :notes, %i[source_type source_id]
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
