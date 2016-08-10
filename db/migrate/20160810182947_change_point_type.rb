class ChangePointType < ActiveRecord::Migration
  def change
    remove_column :points, :latlng
    add_column :points, :lat, :decimal, null: false
    add_column :points, :lng, :decimal, null: false
    change_column :points, :speed, :decimal, default: 0.0
    change_column :points, :hdop, :decimal, default: 0.0
    change_column :points, :alt, :decimal, default: 0.0
  end
end
