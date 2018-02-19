class AddCustomDomainToTrip < ActiveRecord::Migration[5.1]
  def change
    add_column :trips, :custom_domain, :string, index: true
  end
end
