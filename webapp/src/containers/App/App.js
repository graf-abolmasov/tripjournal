import React from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import {
  moveHotPoint,
  intPointsLoaded,
  tracksLoaded,
  hotPointsLoaded,
} from '../../actions'
import './App.css'

class App extends React.Component {

  componentDidMount() {
    this.props.webSocket.subscriptions.create({ channel: 'PointsChannel' }, {
      received: throttle((data) => {
        this.props.onNewHotPoint(data, this.props.followTarget);
      }, 500)
    });

    fetch('/api/pins.json').then((response) => {
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
  }

  render() {
    return (
      <div id="appContainer">
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
  }
});

const ActiveApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ActiveApp;
