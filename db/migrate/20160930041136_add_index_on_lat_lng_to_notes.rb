class AddIndexOnLatLngToNotes < ActiveRecord::Migration[5.0]
  def change
    add_index :notes, [:lat, :lng], where: 'lat is not null and lng is not null'
  end
end
