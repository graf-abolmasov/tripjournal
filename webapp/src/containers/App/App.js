import React from 'react';
import storejs from 'storejs';
import _ from 'lodash';
import MapBox from '../../components/MapBox/MapBox'
import 'ionicons/css/ionicons.css'
import './App.css'

class App extends React.Component {

  constructor () {
    super();

    let webSocket = window.ActionCable.createConsumer();

    webSocket.subscriptions.create({ channel: 'PointsChannel' }, {
      received: _.throttle((data) => {
        this.setHotPoint(data);
        this.setState({hotPoints: _.concat(this.state.hotPoints, [data])});
      }, 500)
    });

    const storedCenter = (localStorage && storejs.get('center')) || { lat: 51.505, lng: -0.09};
    const storedZoom   = (localStorage && storejs.get('zoom')) || 13;

    let storedFollowTarget = false;
    if (localStorage && storejs.has('followTarget')) {
      storedFollowTarget = storejs.get('followTarget')
    }

    this.state = {
      followTarget: storedFollowTarget,
      center: storedCenter,
      zoom: storedZoom,
      pins: [],
      tracks: [],
      hotPoint: window.JsEnv.hot_point,
      hotPoints: []
    };
  }

  render() {
    return (
      <div id="mapContainer">
        <MapBox center={this.state.center}
                zoom={this.state.zoom}
                pins={this.state.pins}
                tracks={this.state.tracks}
                hotPoint={this.state.hotPoint}
                hotPoints={this.state.hotPoints}
                onDragEnd={(e) => this.onMapDragEnd(e)}
                onZoom={(e) => this.onMapZoom(e)}
        />
        {!this.state.followTarget ? (
          <button id="followTargetBtn" className="ion ion-android-locate" onClick={(e) => this.onFollowBtnClick(e)}/>
        ) : null}
      </div>
    );
  }

  zoomMap(zoom) {
    storejs.set('zoom', zoom);
    this.setState({zoom: zoom})
  }

  moveMapCenterTo(newCener) {
    storejs.set('center', newCener);
    this.setState({ center: newCener });
  }

  setFollowTarget(followTarget) {
    storejs.set('followTarget', followTarget);
    this.setState({ followTarget: followTarget });
    if (followTarget) {
      this.zoomMap(13);
      this.moveMapCenterTo(this.state.hotPoint);
    }
  }

  setHotPoint(point) {
    this.setState({ hotPoint: point });
    if (this.state.followTarget) {
      this.moveMapCenterTo(point);
    }
  }

  onFollowBtnClick(e) {
    this.setFollowTarget(true);
  }

  onMapZoom(e) {
    this.zoomMap(e.target.getZoom());
  }

  onMapDragEnd(e) {
    this.setFollowTarget(false);
    this.moveMapCenterTo(e.target.getCenter());
  }

  componentWillMount() {
    fetch('/api/pins.json').then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({pins: data});
    });

    fetch('/api/tracks.json').then((response) => {
      return response.json();
    }).then((data) => {
      data.id = Date.now();
      this.setState({tracks: [data]})
    });

    fetch('/api/hot_points.json').then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({hotPoints: data});
    });
  }

}

export default App;
