# frozen_string_literal: true

class AddTripIdToNotes < ActiveRecord::Migration[5.0]
  def change
    add_reference :notes, :trip, foreign_key: true
  end
end
