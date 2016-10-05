import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import MobileGallery from '../../components/Gallery/MobileGallery'
import './GalleryView.css'

import {
  newSelectedIndex
} from '../../actions'

const GalleryView = ({ intPoints, selectedIntPointIndex, onIntPointSelect }) => {

  if (selectedIntPointIndex === undefined && intPoints.length > 0) {
    selectedIntPointIndex = 0;
  }

  return (
    <div id="galleryContainer">
      { selectedIntPointIndex !== undefined ? (
        <div id="mobileGalleryContainer">
          <MobileGallery intPoints={intPoints}
                         selectedIndex={selectedIntPointIndex}
                         onIntPointSelect={onIntPointSelect}/>
          <Link id="openMapButton" to="/">
            <i className="ion ion-map"/>
          </Link>
        </div>
      ) : null }
    </div>
  )
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  onIntPointSelect: (index) => {
    dispatch(newSelectedIndex(index));
  }
});

const ActiveGalleryView = connect(mapStateToProps, mapDispatchToProps)(GalleryView);

export default ActiveGalleryView;
