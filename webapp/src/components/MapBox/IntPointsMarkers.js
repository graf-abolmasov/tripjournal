import React from 'react'
import { Marker } from 'react-leaflet';

class IntPointsMarkers extends React.Component {

  render() {
    return (
      <div style={{ 'display': 'none' }}>
        { this.props.points.map((point, index) => (
          (point.lat && point.lng) ? (
            <Marker key={point.id}
                    ref={'marker' + index}
                    position={[point.lat, point.lng]}
                    onClick={(e) => this.props.onMarkerClick(index) }>
            </Marker>
          ) : null
        ))}
      </div>
    )
  }
}

export default IntPointsMarkers;
