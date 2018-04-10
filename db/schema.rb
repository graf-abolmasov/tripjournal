# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180410130817) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "instagram_sources", id: :serial, force: :cascade do |t|
    t.string "title"
    t.string "instagram_media_id", null: false
    t.string "original_media_url", null: false
    t.string "original_image_url", null: false
    t.decimal "lat"
    t.decimal "lng"
    t.integer "traveler_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "kind", default: 0, null: false
    t.string "original_video_url"
    t.string "tags", default: [], array: true
    t.index ["traveler_id"], name: "index_instagram_sources_on_traveler_id"
  end

  create_table "int_points", id: :serial, force: :cascade do |t|
    t.string "title"
    t.string "text"
    t.string "source_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "lat", precision: 9, scale: 6
    t.decimal "lng", precision: 9, scale: 6
    t.integer "trip_id", null: false
    t.integer "traveler_id"
    t.integer "source_id", null: false
    t.string "source_type", null: false
    t.integer "kind", default: 0, null: false
    t.string "cl_image_id"
    t.string "cl_video_id"
    t.index ["created_at"], name: "index_int_points_on_created_at"
    t.index ["lat", "lng"], name: "index_int_points_on_lat_and_lng", where: "((lat IS NOT NULL) AND (lng IS NOT NULL))"
    t.index ["source_type", "source_id"], name: "index_int_points_on_source_type_and_source_id"
    t.index ["traveler_id"], name: "index_int_points_on_traveler_id"
    t.index ["trip_id"], name: "index_int_points_on_trip_id"
  end

  create_table "photo_sources", id: :serial, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "traveler_id"
    t.string "cl_public_id", null: false
    t.jsonb "meta", null: false
    t.index ["traveler_id"], name: "index_photo_sources_on_traveler_id"
  end

  create_table "points", id: :serial, force: :cascade do |t|
    t.decimal "alt", precision: 9, scale: 6, default: "0.0"
    t.decimal "speed", precision: 9, scale: 6, default: "0.0"
    t.decimal "hdop", precision: 9, scale: 6, default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "lat", null: false
    t.decimal "lng", null: false
    t.integer "track_id"
    t.bigint "trip_id", null: false
    t.index ["created_at"], name: "index_points_on_created_at"
    t.index ["track_id"], name: "index_points_on_track_id"
    t.index ["trip_id"], name: "index_points_on_trip_id"
  end

  create_table "tracks", id: :serial, force: :cascade do |t|
    t.json "geojson_hq"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json "geojson_lq"
    t.integer "trip_id", null: false
    t.string "type"
    t.index ["trip_id"], name: "index_tracks_on_trip_id"
    t.index ["updated_at"], name: "index_tracks_on_updated_at"
  end

  create_table "travelers", id: :serial, force: :cascade do |t|
    t.string "nickname", null: false
    t.string "instagram_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.index ["nickname"], name: "index_travelers_on_nickname", unique: true
  end

  create_table "trips", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.text "checkpoints"
    t.datetime "start_date"
    t.datetime "finish_date"
    t.decimal "length", null: false
    t.boolean "published", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "custom_domain"
  end

  add_foreign_key "instagram_sources", "travelers", on_update: :cascade, on_delete: :nullify
  add_foreign_key "int_points", "travelers", on_update: :cascade, on_delete: :nullify
  add_foreign_key "int_points", "trips", on_update: :cascade, on_delete: :cascade
  add_foreign_key "photo_sources", "travelers", on_update: :cascade, on_delete: :nullify
  add_foreign_key "points", "tracks", on_update: :cascade, on_delete: :nullify
  add_foreign_key "points", "trips", on_update: :cascade, on_delete: :cascade
  add_foreign_key "tracks", "trips", on_update: :cascade, on_delete: :cascade
end
