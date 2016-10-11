import React from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import screenfull from 'screenfull';
import {
  moveHotPoint,
  intPointsLoaded,
  tracksLoaded,
  hotPointsLoaded,
  requestFullScreen
} from '../../actions'
import './App.scss'

class App extends React.Component {

  componentDidMount() {
    this.props.webSocket.subscriptions.create({ channel: 'PointsChannel' }, {
      received: throttle((data) => {
        this.props.onNewHotPoint(data, this.props.followTarget);
      }, 500)
    });

    fetch('/api/int_points.json').then((response) => {
      return response.json();
    }).then((data) => {
      this.props.onIntPointsLoaded(data);
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

    setTimeout(() => {
      this.props.onFullScreenBtnClick(true);
    }, 10000)
  }

  render() {
    return (
      <div id="appContainer">
        {window.mobileDetect && screenfull.enabled && !this.props.isFullscreen ? (
          <div id="fullScreenBtnContainer">
            <span>Перейти в полный экран</span>
            <button onClick={(e) => this.props.onFullScreenBtnClick()}>
              <i className="ion ion-android-expand"/>
            </button>
          </div>
        ): null}
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  onNewHotPoint: (newHotPoint) => {
    dispatch(moveHotPoint(newHotPoint));
  },
  onTracksLoaded: (tracks) => {
    dispatch(tracksLoaded(tracks));
  },
  onIntPointsLoaded: (intPoints) => {
    dispatch(intPointsLoaded(intPoints));
  },
  onHotPointsLoaded: (hotPoints) => {
    dispatch(hotPointsLoaded(hotPoints));
  },
  onFullScreenBtnClick: (timeout = false) => {
    if (!timeout && window.mobileDetect && screenfull.enabled) {
      screenfull.request();
    }
    dispatch(requestFullScreen());
  }
});

const ActiveApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ActiveApp;
