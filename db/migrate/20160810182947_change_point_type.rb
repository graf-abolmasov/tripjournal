class ChangePointType < ActiveRecord::Migration
  def up
    add_column :points, :lat, :decimal, precision: 9, scale: 6
    add_column :points, :lng, :decimal, precision: 9, scale: 6
    execute 'update points set lat = latlng[0], lng=latlng[1]'
    remove_column :points, :latlng
    change_column :points, :lat, :decimal, null: false
    change_column :points, :lng, :decimal, null: false
    change_column :points, :speed, :decimal, default: 0.0, precision: 9, scale: 6
    change_column :points, :hdop, :decimal, default: 0.0, precision: 9, scale: 6
    change_column :points, :alt, :decimal, default: 0.0, precision: 9, scale: 6
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
