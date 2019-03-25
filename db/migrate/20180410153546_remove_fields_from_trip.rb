# frozen_string_literal: true

class RemoveFieldsFromTrip < ActiveRecord::Migration[5.1]
  def change
    remove_columns :trips, :length, :published, :checkpoints, :description
  end
end
