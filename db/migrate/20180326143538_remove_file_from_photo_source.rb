# frozen_string_literal: true

class RemoveFileFromPhotoSource < ActiveRecord::Migration[5.1]
  def change
    remove_column :photo_sources, :file
    remove_column :photo_sources, :file_ratio
    remove_column :photo_sources, :file_exif
  end
end
