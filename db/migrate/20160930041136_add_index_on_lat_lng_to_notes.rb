# frozen_string_literal: true

class AddIndexOnLatLngToNotes < ActiveRecord::Migration[5.0]
  def change
    add_index :notes, %i[lat lng], where: 'lat is not null and lng is not null'
  end
end
