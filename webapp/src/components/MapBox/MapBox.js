import React from 'react';
import { Map, TileLayer, Marker, Polyline, GeoJSON } from 'react-leaflet';
import HotPointIcon from './HotPointIcon'
import IntPointsMarkers from './IntPointsMarkers'
import './MapBox.css';
import 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

const MapBox = ({ center, zoom, minZoom, maxZoom, intPoints, tracks, hotPoint, hotTrack, onDragStart, onDragEnd, onZoom, onIntPointMarkerClick}) => (
  <Map center={[center.lat, center.lng]}
       zoomControl={false}
       zoom={zoom}
       minZoom={minZoom}
       maxZoom={maxZoom}
       onDragstart={onDragStart}
       onDragend={onDragEnd}
       onZoomend={onZoom}>
    <TileLayer
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={[hotPoint.lat, hotPoint.lng]} icon={ HotPointIcon }/>
    <IntPointsMarkers points={intPoints} onMarkerClick={onIntPointMarkerClick}/>
    { hotTrack.length > 2 ? (
      <Polyline positions={hotTrack} color="red"/>
    ) : null }
    {tracks.map((track) => {
      return <GeoJSON key={track.id} data={track}/>
    })}
  </Map>
);

export default MapBox;
