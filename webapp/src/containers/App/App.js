import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import MapBox from '../../components/MapBox/MapBox'
import 'ionicons/css/ionicons.css'
import './App.css'
import {
  moveMapCenter,
  stopFollowTarget,
  followTarget,
  zoomMap,
  moveHotPoint,
  pinsLoaded,
  tracksLoaded,
  hotPointsLoaded
} from '../../actions'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.props.webSocket.subscriptions.create({ channel: 'PointsChannel' }, {
      received: _.throttle((data) => {
        this.props.onNewHotPoint(data, this.props.followTarget);
      }, 500)
    });
  }

  componentDidMount() {
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
                  onClick={(e) => this.props.onFollowBtnClick(e, this.props.hotPoint)}/>
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
    dispatch(stopFollowTarget());
    dispatch(moveMapCenter(e.target.getCenter()));
  },
  onFollowBtnClick: (e, hotPoint) => {
    dispatch(followTarget());
    dispatch(moveMapCenter(hotPoint));
    dispatch(zoomMap(13));
  },
  onMapZoom: (e) => {
    dispatch(zoomMap(e.target.getZoom()))
  },
  onNewHotPoint: (newHotPoint, followTarget) => {
    dispatch(moveHotPoint(newHotPoint));
    if (followTarget) {
      dispatch(moveMapCenter(newHotPoint));
    }
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

const ActiveApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ActiveApp;
