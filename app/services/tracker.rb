class Tracker

  def self.merge(track_ids)
    Track.transaction do
      first_track = Track.find(track_ids.pop)
      tracks_to_merge = Track.where(id: track_ids)

      first_track_json = JSON.load(first_track.json)

      tracks_to_merge.each do |track|
        first_track_json['geometry']['coordinates'] += JSON.load(track.json)['geometry']['coordinates']
      end

      first_track.json = JSON.dump(first_track_json)
      first_track.save
      tracks_to_merge.delete_all
    end
  end

end