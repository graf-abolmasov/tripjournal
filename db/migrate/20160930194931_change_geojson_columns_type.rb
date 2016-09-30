class ChangeGeojsonColumnsType < ActiveRecord::Migration[5.0]
  def change
    change_column :tracks, :geojson_hq, :json, using: 'geojson_hq::json'
    change_column :tracks, :geojson_lq, :json, using: 'geojson_lq::json'
  end
end
