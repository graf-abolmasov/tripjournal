# frozen_string_literal: true

class AddDeviseToTravelers < ActiveRecord::Migration[5.1]
  def change
    add_column :travelers,
               :encrypted_password,
               :string,
               null: false,
               default: ''
    add_index :travelers, :nickname, unique: true
  end
end
