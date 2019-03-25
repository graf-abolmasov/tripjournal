# frozen_string_literal: true

class AddTagsToInstagramSource < ActiveRecord::Migration[5.1]
  def change
    add_column :instagram_sources, :tags, :string, array: true, default: []
  end
end
