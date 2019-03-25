# frozen_string_literal: true

class AddClImageIdToPhotoSources < ActiveRecord::Migration[5.1]
  def change
    add_column :photo_sources, :cl_public_id, :string, null: false
    add_column :photo_sources, :meta,         :jsonb,  null: false
  end
end
