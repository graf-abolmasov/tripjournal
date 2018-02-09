class AddScaleVersionToTrack < ActiveRecord::Migration[4.2]
  def change
    rename_column :tracks, :json, :geojson_hq
    add_column :tracks, :geojson_lq, :text
  end
end
