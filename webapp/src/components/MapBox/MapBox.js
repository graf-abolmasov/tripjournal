import React from 'react';
import { Map, TileLayer, Marker, Popup, Polyline, GeoJson } from 'react-leaflet';
import HotPointMarker from './HotPointMarker'
import './MapBox.css';
import 'leaflet/dist/leaflet.css'

const MapBox = ({ center, zoom, minZoom, maxZoom, pins, tracks, hotPoint, hotPoints, onDragEnd, onZoom }) => (
  <Map center={[center.lat, center.lng]} zoom={zoom} minZoom={minZoom} maxZoom={maxZoom} onDragend={onDragEnd}
       onZoomend={onZoom} zoomControl={false}>
    <TileLayer
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={[hotPoint.lat, hotPoint.lng]} icon={ HotPointMarker }/>
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
    { hotPoint.length > 2 ? (
      <Polyline positions={hotPoints} color="red"/>
    ) : null }
    {tracks.map((track) => {
      return <GeoJson key={track.id} data={track}/>
    })}
  </Map>
);

export default MapBox;
