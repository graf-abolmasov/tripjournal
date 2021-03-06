import React from 'react'
import { connect } from 'react-redux'
import { identity } from "ramda"
import { Link } from "react-router-dom"
import MapBox from '../../components/MapBox/MapBox'
import MapControls from '../../components/MapBox/MapControls'
import mapActions from './map-actions'

import 'ionicons/css/ionicons.css'
import './MapView.scss'

const MapView = props =>
  <div id="mapContainer">
    <MapBox center={props.center}
            zoom={props.zoom}
            minZoom={props.minZoom}
            maxZoom={props.maxZoom}
            intPoints={props.intPoints}
            tracks={props.tracks}
            hotPoint={props.hotPoint}
            hotTrack={props.hotTrack}
            onDragStart={() => props.stopFollowTarget() }
            onDragEnd={(e) => props.moveCenter(e.target.getCenter())}
            onZoom={(e) => {props.zoomMap(e.target.getZoom())}}
            onIntPointMarkerClick={props.openGallery}
    />
    <div id="mapBottomBarContainer">
      <div id="mapControlsContainer">
        <MapControls followTarget={props.followTarget}
                     zoom={props.zoom}
                     maxZoom={props.maxZoom}
                     minZoom={props.minZoom}
                     onFollowClick={props.startFollowTarget}
                     onZoomInClick={props.zoomIn}
                     onZoomOutClick={props.zoomOut}
        />
        <Link id="openGalleryButton" className="ion ion-image" to="/gallery"/>
      </div>
    </div>
  </div>

const mapStateToProps = (state) => {
  return {
    center: state.ui.map.center,
    zoom: state.ui.map.zoom,
    minZoom: state.ui.map.minZoom,
    maxZoom: state.ui.map.maxZoom,
    intPoints: state.data.intPoints,
    tracks: state.data.tracks,
    hotPoint: state.data.hotPoint,
    hotTrack: state.data.hotTrack,
    followTarget: state.ui.map.followTarget,
    selectedIntPointIndex: state.ui.gallery.selectedIntPointIndex,
  }
}

export default connect(mapStateToProps, mapActions)(MapView);
