# frozen_string_literal: true

class AddTypeToInstagramSource < ActiveRecord::Migration[5.0]
  def change
    add_column :instagram_sources, :kind, :integer, null: false, default: 0
    add_column :instagram_sources, :original_video_url, :string
  end
end
