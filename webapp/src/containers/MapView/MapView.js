import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MapBox from '../../components/MapBox/MapBox'
import MapControls from '../../components/MapBox/MapControls'
import DesktopGalleryThumbnails from '../../components/Gallery/DesktopGalleryThumbnails'
import DesktopGalleryPreview from '../../components/Gallery/DesktopGalleryPreview'
import 'ionicons/css/ionicons.css'
import './MapView.scss'
import {
  moveMapCenter,
  followTarget,
  zoomMap,
  zoomIn,
  zoomOut,
  newSelectedIndex,
  toggleDesktopGalleryThumbnails
} from '../../actions'

class MapView extends React.Component {

  render() {
    return (
      <div id="mapContainer">
        <MapBox center={this.props.center}
                zoom={this.props.zoom}
                minZoom={this.props.minZoom}
                maxZoom={this.props.maxZoom}
                intPoints={this.props.intPoints}
                selectedIntPointIndex={this.props.selectedIntPointIndex}
                tracks={this.props.tracks}
                hotPoint={this.props.hotPoint}
                hotPoints={this.props.hotPoints}
                onDragEnd={(e) => this.props.onMapDragEnd(e)}
                onZoom={(e) => this.props.onMapZoom(e)}
                onIntPointMarkerClick={(index) => {this.props.onIntPointMarkerClick(index)}}
        />
        { !window.mobileDetect && this.props.selectedIntPointIndex !== undefined ? (
          <div id="fullImageContainer">
            <DesktopGalleryPreview intPoint={this.props.intPoints[this.props.selectedIntPointIndex]}/>
          </div>
        ) : null }
        <div id="mapBottomBarContainer">
          <div id="mapControlsContainer">
            <MapControls followTarget={this.props.followTarget}
                         zoom={this.props.zoom}
                         maxZoom={this.props.maxZoom}
                         minZoom={this.props.minZoom}
                         onFollowClick={(e) => this.props.onFollowBtnClick(e)}
                         onZoomInClick={(e) => this.props.onZoomInBtnClick(e)}
                         onZoomOutClick={(e) => this.props.onZoomOutBtnClick(e)}
            />
            <button id="openGalleryButton" className="ion ion-image" onClick={(e) => this.props.onGalleryBtnClick()}/>
          </div>
          { !window.mobileDetect && this.props.selectedIntPointIndex !== undefined ? (
            <div id="desktopGalleryThumbnailsContainer">
              <DesktopGalleryThumbnails selectedIndex={this.props.selectedIntPointIndex}
                                        intPoints={this.props.intPoints}
                                        onIntPointSelect={(index) => this.props.onIntPointSelect(index)}
              />
            </div>
          ) : null }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  onZoomInBtnClick: (e) => {
    dispatch(zoomIn())
  },
  onZoomOutBtnClick: (e) => {
    dispatch(zoomOut())
  },
  onMapDragEnd: (e) => {
    dispatch(moveMapCenter(e.target.getCenter()));
  },
  onFollowBtnClick: (e) => {
    dispatch(followTarget());
  },
  onMapZoom: (e) => {
    dispatch(zoomMap(e.target.getZoom()))
  },
  onIntPointMarkerClick: (index) => {
    dispatch(newSelectedIndex(index));
    if (window.mobileDetect) {
      dispatch(push('/gallery'));
    }
  },
  onGalleryBtnClick: () => {
    if (window.mobileDetect) {
      dispatch(push('/gallery'));
    } else {
      dispatch(toggleDesktopGalleryThumbnails());
    }
  },
  onIntPointSelect: (index) => {
    dispatch(newSelectedIndex(index));
  }
});

const ActiveMapView = connect(mapStateToProps, mapDispatchToProps)(MapView);

export default ActiveMapView;
