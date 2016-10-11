class RenameNoteToIntPoint < ActiveRecord::Migration[5.0]
  def change
    rename_table :notes, :int_points
  end
end
