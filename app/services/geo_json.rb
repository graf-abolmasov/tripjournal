class GeoJson
  class << self
    def from_track(track, tolerance = 1, highest_quality = false)
      {
          type: 'Feature',
          geometry: {
              type: 'MultiLineString',
              coordinates: [simplify(track.points.to_a, tolerance, highest_quality).map { |tp| [tp.y, tp.x] }]
          }
      }
    end

    private

    def simplify(points_x_y, tolerance = 1, highest_quality = false)
      SimplifyRb::Simplifier.new.process(points_x_y, tolerance, highest_quality)
    end
  end
end