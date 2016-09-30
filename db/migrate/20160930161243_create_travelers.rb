class CreateTravelers < ActiveRecord::Migration[5.0]
  def up
    create_table :travelers do |t|
      t.string :nickname, null: false
      t.string :instagram_token

      t.timestamps
    end

    add_reference :notes, :traveler, index: true, foreign_key: true

    execute 'insert into travelers (nickname, created_at, updated_at) select distinct author, now(), now() from notes'
    execute 'update notes set traveler_id = (select id from travelers where notes.author = travelers.nickname)'

    remove_column :notes, :author
  end

  def down
    add_column :notes, :author

    execute 'update notes set author = (select nickname from travelers where notes.traveler_id = travelers.id)'

    remove_reference :notes, :traveler

    drop_table :travelers
  end
end
