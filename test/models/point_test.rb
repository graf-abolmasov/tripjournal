require 'test_helper'

class PointTest < ActiveSupport::TestCase
  test 'should not save point without location' do
    point = Point.new
    assert_raises { point.save }
  end

  test 'to_x_y returns hash and x = lat, y = lng' do
    p = Point.new(lat: 1, lng: 2)
    assert_equal({ x: 1.0, y: 2.0 }, p.to_x_y)
  end

end