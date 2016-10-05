import React from 'react'
import { Marker } from 'react-leaflet';
import './IntPointsMarker.css'

class IntPointsMarkers extends React.Component {

  render() {
    return (
      <div style={{ 'display': 'none' }}>
        { this.props.points.map((point, index) => (
          <Marker key={point.id}
                  ref={'marker' + index}
                  position={[point.lat, point.lng]}
                  onClick={(e) => this.props.onMarkerClick(index) }>
          </Marker>
        ))}
      </div>
    )
  }
}

export default IntPointsMarkers;
