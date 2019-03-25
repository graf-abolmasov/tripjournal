# frozen_string_literal: true

class Track::Processing < Track
  def to_partial_path
    'tracks/processing'
  end

  def processing
    true
  end
end
