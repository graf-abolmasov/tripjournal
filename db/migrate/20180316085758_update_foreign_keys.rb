# frozen_string_literal: true

class UpdateForeignKeys < ActiveRecord::Migration[5.1]
  def up
    remove_foreign_key 'instagram_sources', 'travelers'
    remove_foreign_key 'int_points', 'travelers'
    remove_foreign_key 'int_points', 'trips'
    remove_foreign_key 'photo_sources', 'travelers'
    remove_foreign_key 'points', 'tracks'
    remove_foreign_key 'points', 'trips'
    remove_foreign_key 'tracks', 'trips'

    add_foreign_key 'instagram_sources', 'travelers', on_update: :cascade, on_delete: :nullify
    add_foreign_key 'photo_sources', 'travelers',     on_update: :cascade, on_delete: :nullify
    add_foreign_key 'int_points', 'travelers',        on_update: :cascade, on_delete: :nullify
    add_foreign_key 'points', 'tracks',               on_update: :cascade, on_delete: :nullify

    add_foreign_key 'int_points', 'trips',            on_update: :cascade, on_delete: :cascade
    add_foreign_key 'points', 'trips',                on_update: :cascade, on_delete: :cascade
    add_foreign_key 'tracks', 'trips',                on_update: :cascade, on_delete: :cascade

    change_column_null('int_points', 'trip_id', false)
    change_column_null('points', 'trip_id', false)
  end

  def down
    change_column_null('int_points', 'trip_id', true)
    change_column_null('points', 'trip_id', true)

    remove_foreign_key 'instagram_sources', 'travelers'
    remove_foreign_key 'int_points', 'travelers'
    remove_foreign_key 'int_points', 'trips'
    remove_foreign_key 'photo_sources', 'travelers'
    remove_foreign_key 'points', 'tracks'
    remove_foreign_key 'points', 'trips'
    remove_foreign_key 'tracks', 'trips'

    add_foreign_key 'instagram_sources', 'travelers'
    add_foreign_key 'int_points', 'travelers'
    add_foreign_key 'int_points', 'trips'
    add_foreign_key 'photo_sources', 'travelers'
    add_foreign_key 'points', 'tracks'
    add_foreign_key 'points', 'trips'
    add_foreign_key 'tracks', 'trips'
  end
end
