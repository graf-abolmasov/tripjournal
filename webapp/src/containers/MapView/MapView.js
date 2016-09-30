import React from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import MapBox from '../../components/MapBox/MapBox'
import 'ionicons/css/ionicons.css'
import './MapView.css'
import {
  moveMapCenter,
  followTarget,
  zoomMap,
  moveHotPoint,
  pinsLoaded,
  tracksLoaded,
  hotPointsLoaded
} from '../../actions'

class MapView extends React.Component {

  componentDidMount() {
    this.props.webSocket.subscriptions.create({ channel: 'PointsChannel' }, {
      received: throttle((data) => {
        this.props.onNewHotPoint(data, this.props.followTarget);
      }, 500)
    });

    fetch('/api/pins.json').then((response) => {
      return response.json();
    }).then((data) => {
      this.props.onPinsLoaded(data);
    });

    fetch('/api/tracks.json').then((response) => {
      return response.json();
    }).then((data) => {
      this.props.onTracksLoaded(data);
    });

    fetch('/api/hot_points.json').then((response) => {
      return response.json();
    }).then((data) => {
      this.props.onHotPointsLoaded(data);
    });
  }

  render() {
    return (
      <div id="mapContainer">
        <MapBox center={this.props.center}
                zoom={this.props.zoom}
                pins={this.props.pins}
                tracks={this.props.tracks}
                hotPoint={this.props.hotPoint}
                hotPoints={this.props.hotPoints}
                onDragEnd={(e) => this.props.onMapDragEnd(e)}
                onZoom={(e) => this.props.onMapZoom(e)}
        />
        {!this.props.followTarget ? (
          <button id="followTargetBtn" className="ion ion-android-locate"
                  onClick={(e) => this.props.onFollowBtnClick(e)}/>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  onMapDragEnd: (e) => {
    dispatch(moveMapCenter(e.target.getCenter()));
  },
  onFollowBtnClick: (e) => {
    dispatch(followTarget());
  },
  onMapZoom: (e) => {
    dispatch(zoomMap(e.target.getZoom()))
  },
  onNewHotPoint: (newHotPoint) => {
    dispatch(moveHotPoint(newHotPoint));
  },
  onTracksLoaded: (tracks) => {
    dispatch(tracksLoaded(tracks));
  },
  onPinsLoaded: (pins) => {
    dispatch(pinsLoaded(pins));
  },
  onHotPointsLoaded: (hotPoints) => {
    dispatch(hotPointsLoaded(hotPoints));
  }
});

const ActiveMapView = connect(mapStateToProps, mapDispatchToProps)(MapView);

export default ActiveMapView;
