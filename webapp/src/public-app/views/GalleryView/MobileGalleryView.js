import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { identity } from "ramda"
import MobileGallery from '../../components/Gallery/MobileGallery'
import galleryActions from './gallery-actions'

import './MobileGalleryView.scss'

const MobileGalleryView = ({center, intPoints, selectedIntPointIndex, setSelectedIndex}) => {

  return (
    <div id="mobileGalleryContainer">
      <MobileGallery center={center}
                     intPoints={intPoints}
                     selectedIndex={selectedIntPointIndex}
                     setSelectedIndex={setSelectedIndex}/>
      <Link id="openMapButton" to="/">
        <i className="ion ion-map"/>
      </Link>
    </div>
  )
}

export default connect(identity, galleryActions)(MobileGalleryView)
