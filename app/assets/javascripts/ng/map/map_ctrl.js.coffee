angular.module('tj').controller 'MapCtrl', ['$scope', 'leafletData', '$pusher', '$http', 'leafletEvents', ($scope, leafletData, $pusher, $http, leafletEvents) ->

  $scope.follow_current_position = true

  $scope.defaults = {
    zoomControl: false
  }
  $scope.markers = {}
  $scope.paths   = {}
  $scope.geojson = {
    data: [],
    style:
      opacity: 0.95
      weight: 2
  }
  $scope.center = {}

  $http.get('/api/points.json').then (response) ->
    $scope.paths.saved_track = {
      color: 'blue',
      weight: 2,
      latlngs: response.data
    }

  $http.get('/api/tracks.json').then (response) ->
    $scope.geojson.data = response.data

  $http.get('/api/pins.json').then (response) ->
    _.each response.data, (note) ->
      $scope.markers["note_#{note.id}"] = {
        lat: note.lat,
        lng: note.lng,
        compileMessage: true,
        message: _note_message(note),
        icon: {
          type: 'awesomeMarker',
          icon: _note_icon(note.kind)
          prefix: 'fa',
        }
      }

  $scope.init = (last_lat, last_lng) ->
    $scope.current_position = {
      lat: last_lat,
      lng: last_lng,
      icon: {
        type: 'awesomeMarker',
        icon: 'car',
        markerColor: 'red',
        prefix: 'fa',
      }
    }

    $scope.center = {
      zoom: 5,
      lat: last_lat,
      lng: last_lng,
      autoDiscover: false
    }

    $scope.markers = { current_position: $scope.current_position }

    $scope.paths.online_track = {
      color: 'red',
      weight: 2,
      latlngs: [ {lat: last_lat, lng: last_lng} ]
    }

  $scope.$on 'leafletDirectiveMap.drag', (event) ->
    $scope.follow_current_position = false

  $scope.follow_position = () ->
    $scope.follow_current_position = true
    _move_center_to($scope.current_position)

  $pusher.subscribe 'tj:map:update_current_position', (data) ->
    $scope.current_position.lat = data.lat
    $scope.current_position.lng = data.lng
    _move_center_to(data) if $scope.follow_current_position
    $scope.paths.online_track.latlngs.push data

  _move_center_to = (location) ->
    $scope.center.lat = location.lat
    $scope.center.lng = location.lng

  _note_message = (note) ->
    if note.kind == 'photo'
      "<div class='map-note-image'><img class='img-responsive' src='#{note.image_url}'/>@#{note.author}</div>"
    else
      "<div class='map-note-text'>@#{note.text}</div>"

  _note_icon = (note_type) ->
    if note_type == 'photo'
      'instagram'
    else
      'comment'
]