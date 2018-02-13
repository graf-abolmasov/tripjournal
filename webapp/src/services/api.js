export default {
  fetchIntPoints: () =>
    fetch('/api/int_points.json').then((resp) => resp.json()),
  fetchhotTrack: () =>
    fetch('/api/hot_points.json').then((resp) => resp.json()),
  fetchTracks: () =>
    fetch('/api/tracks.json').then((resp) => resp.json())
}
