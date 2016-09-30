class AddTravelerIdToPhotoSource < ActiveRecord::Migration[5.0]
  def change
    remove_column :photo_sources, :author
    add_reference :photo_sources, :traveler, index: true, foreign_key: true
  end
end
