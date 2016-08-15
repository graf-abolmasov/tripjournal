class Note

  include Mongoid::Document

  field :lat, type: BigDecimal
  field :lng, type: BigDecimal
  field :author, type: String
  field :image_url, type: String
  field :kind, type: String

end
