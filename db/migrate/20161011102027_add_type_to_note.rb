# frozen_string_literal: true

class AddTypeToNote < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :kind, :integer, null: false, default: 0
    add_column :notes, :video_url, :string
  end
end
