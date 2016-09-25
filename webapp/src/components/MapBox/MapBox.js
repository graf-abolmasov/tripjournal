import React from 'react';
import { Map, TileLayer, Marker, Popup, Polyline, GeoJson, ZoomControl } from 'react-leaflet';
import HotPointMarker from './HotPointMarker'
import './MapBox.css';
import 'leaflet/dist/leaflet.css'

const MapBox = ({ center, zoom, pins, tracks, hotPoint, hotPoints, onDragEnd, onZoom }) => (
  <Map center={[center.lat, center.lng]} zoom={zoom} onDragend={onDragEnd} onZoomend={onZoom} zoomControl={false}>
    <ZoomControl position='topright'/>
    <TileLayer
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={[hotPoint.lat, hotPoint.lng]}
            icon={ HotPointMarker }/>
    {pins.map((pin) => (
      <Marker key={pin.id} position={[pin.lat, pin.lng]}>
        <Popup>
          <div className='map-note-image'>
            <img src={pin.image_url} alt={pin.image_url}/>
            @{pin.author}
          </div>
        </Popup>
      </Marker>
    ))}
    <Polyline positions={hotPoints} color="red"/>
    {tracks.map((track) => {
      return <GeoJson key={track.id} data={track}/>
    })}
  </Map>
);

export default MapBox;
