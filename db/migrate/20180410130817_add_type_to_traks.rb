class AddTypeToTraks < ActiveRecord::Migration[5.1]
  def change
    add_column :tracks, :type, :string, index: true
  end
end
