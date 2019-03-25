# frozen_string_literal: true

class ChangeNoteType < ActiveRecord::Migration[4.2]
  def up
    add_column :notes, :lat, :decimal, precision: 9, scale: 6
    add_column :notes, :lng, :decimal, precision: 9, scale: 6
    execute 'update notes set lat = latlng[0], lng=latlng[1]'
    remove_column :notes, :latlng
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
