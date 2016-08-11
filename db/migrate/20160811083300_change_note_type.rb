class ChangeNoteType < ActiveRecord::Migration
  def up
    add_column :notes, :lat, :decimal
    add_column :notes, :lng, :decimal
    execute 'update notes set lat = latlng[0], lng=latlng[1]'
    remove_column :notes, :latlng
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
