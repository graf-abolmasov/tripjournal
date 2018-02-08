import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import MobileGallery from '../../components/Gallery/MobileGallery'
import './GalleryView.scss'

import {
  newSelectedIndex
} from '../../actions'

const GalleryView = ({ center, intPoints, selectedIntPointIndex, onIntPointSelect }) => {

  if (selectedIntPointIndex === undefined) {
    selectedIntPointIndex = 0;
  }

  return (
    <div id="galleryContainer">
      { window.mobileDetect ? (
        <div id="mobileGalleryContainer">
          { intPoints.length === 0 ? (
            <h1 id="noIntPointsMessage">
              Друг, приходи чуть попозже. Скоро тут будет много картинок из нашей замечательно поездки
            </h1>
          ) : (
            <MobileGallery center={center}
                           intPoints={intPoints}
                           selectedIndex={selectedIntPointIndex}
                           onIntPointSelect={onIntPointSelect}/>
          ) }
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
