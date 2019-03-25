# frozen_string_literal: true

class AddClPublicIdToIntPoint < ActiveRecord::Migration[5.1]
  def change
    add_column :int_points, :cl_image_id, :string
    add_column :int_points, :cl_video_id, :string

    remove_columns :int_points, :image_url, :video_url
  end
end
