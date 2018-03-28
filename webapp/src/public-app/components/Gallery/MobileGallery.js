import React from 'react'
import ReactSwipe from 'react-swipe'
import { Map, TileLayer, Marker } from 'react-leaflet'

import IntPointIcon from "../MapBox/IntPointIcon"

import 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import './MobileGallery.scss'

class MobileGallery extends React.Component {

  constructor(props) {
    super(props)

    this.state = {orientation: this.getOrientation()}

    window.addEventListener("orientationchange", () => {
      this.setState({orientation: this.getOrientation()})
    })
  }

  getOrientation() {
    return screen.height > screen.width ? 'portrait' : 'landscape'
  }

  render() {
    const selectedIntPoint = this.props.intPoints[this.props.selectedIndex]

    if (!selectedIntPoint) {
      return null
    }

    const swipeOptions = {
      startSlide: this.props.selectedIndex,
      callback: (index) => {
        this.props.setSelectedIndex(index)
      }
    }

    return (
      <div className="MobileGallery" key={this.state.orientation}>
        <div className="preview">
          <ReactSwipe swipeOptions={swipeOptions} key={this.props.intPoints.length}>
            {this.props.intPoints.map((intPoint) => (
              <div key={intPoint.id}>
                <img src={intPoint.image_big_url} alt={intPoint.author}/>
                <span>@{intPoint.author}</span>
              </div>
            ))}
          </ReactSwipe>
        </div>
        <div className="smallMap">
          <Map center={this.props.center}
               zoomControl={false}
               zoom={8}
               minZoom={8}
               maxZoom={8}
               dragging={false}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
            {(selectedIntPoint.lat && selectedIntPoint.lng) ? (
              <Marker position={[selectedIntPoint.lat, selectedIntPoint.lng]}
                      icon={ IntPointIcon }
              />
            ) : null}
          </Map>
        </div>
      </div>
    )
  }
}

export default MobileGallery
