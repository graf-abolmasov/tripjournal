import React from 'react';
import ReactSwipe from 'react-swipe';
import { Map, TileLayer, Marker } from 'react-leaflet';
import './MobileGallery.css'

class MobileGallery extends React.Component {

  render() {
    const selectedIntPoint = this.props.intPoints[this.props.selectedIndex];

    const swipeOptions = {
      startSlide: this.props.selectedIndex,
      callback: (index) => {
        this.props.onIntPointSelect(index)
      }
    };

    return (
      <div className="MobileGallery">
        <div className="preview">
          <ReactSwipe swipeOptions={swipeOptions} key={this.props.intPoints.length}>
            { this.props.intPoints.map((intPoint) => (
              <img key={intPoint.id} src={intPoint.image_url} alt={intPoint.author}/>
            ))}
          </ReactSwipe>
        </div>
        <div className="smallMap">
          { (selectedIntPoint.lat && selectedIntPoint.lng) ? (
            <Map center={[selectedIntPoint.lat, selectedIntPoint.lng]}
                 zoomControl={false}
                 zoom={10}
                 minZoom={10}
                 maxZoom={10}
                 dragging={false}>
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[selectedIntPoint.lat, selectedIntPoint.lng]}/>
            </Map>
          ) : (
            <div>
              No lat lng specified
            </div>
          ) }
        </div>
      </div>
    );
  }
}

export default MobileGallery;
