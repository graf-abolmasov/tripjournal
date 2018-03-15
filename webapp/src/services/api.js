export default {
  fetchIntPoints: (payload) =>
    fetch(`/api/int_points.json?trip_id=${payload}`).then((resp) => resp.json()),
  fetchHotTrack: (payload) =>
    fetch(`/api/hot_points.json?trip_id=${payload}`).then((resp) => resp.json()),
  fetchTracks: (payload) =>
    fetch(`/api/tracks.json?trip_id=${payload}`).then((resp) => resp.json()),
  fetchTrips: () =>
    fetch(`/api/trips.json`).then((resp) => resp.json()),
}
