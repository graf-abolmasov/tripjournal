class CreateTrips < ActiveRecord::Migration[5.0]
  def change
    create_table :trips do |t|
      t.string :name
      t.text :description
      t.text :checkpoints

      t.datetime :start_date
      t.datetime :finish_date
      t.decimal :length, null: false

      t.boolean :published, default: false

      t.timestamps
    end
  end
end
