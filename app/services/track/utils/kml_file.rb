# frozen_string_literal: true

require 'zip'

class Track::Utils::KmlFile
  class << self
    def read(filename)
      data = read_file(filename)
      coords = data.css('gxXcoord').to_a
      dates = data.css('when').to_a
      points = coords.each_with_index.map do |c, idx|
        x_y_created_at(c, dates[idx])
      end
      [points]
    end

    private

    def x_y_created_at(coord, date)
      x_y_z = coord.content.split(' ')
      { x: x_y_z[1].to_f, y: x_y_z[0].to_f, created_at: date.content }
    end

    def read_file(filename)
      ext = filename[-3..-1]
      if ext == 'kmz'
        Nokogiri::XML(read_kmz(filename))
      elsif ext == 'kml'
        Nokogiri::XML(read_kml(filename))
      else
        raise 'Unsupported format'
      end
    end

    def read_kml(filename)
      File.read(filename).gsub('gx:', 'gxX')
    end

    def read_kmz(filename)
      Zip::File.open(filename) do |zip_file|
        doc_kml = zip_file.glob('doc.kml').first
        doc_kml.get_input_stream.read.gsub('gx:', 'gxX')
      end
    end
  end
end
