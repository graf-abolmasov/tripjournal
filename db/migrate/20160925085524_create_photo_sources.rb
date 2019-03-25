# frozen_string_literal: true

class CreatePhotoSources < ActiveRecord::Migration[5.0]
  def change
    create_table :photo_sources do |t|
      t.string :author, null: false

      t.string :file, null: false
      t.float  :file_ratio, default: 1.0
      t.text   :file_exif,  default: YAML.dump({})

      t.timestamps
    end
  end
end
