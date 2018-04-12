import React from 'react'
import { connect } from 'react-redux'
import screenfull from 'screenfull'
import appActions from "./app-actions"

import './App.sass'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showFullscreenButton: true
    }
  }

  componentDidMount() {
    this.props.start(this.props.trip)
    setTimeout(() => {
      this.setState({showFullscreenButton: false})
    }, 8000)
  }

  renderFullscreenButton() {
    return (
      <button className="app__fullscreen-button" onClick={this.props.requestFullScreen}>
        Перейти в полный экран
      </button>
    )
  }

  renderSettingsButton() {
    return (
      <a className="app__settings-button" href="/admin">
        <i className="ion ion-android-settings"/>
      </a>
    )
  }

  render() {
    const showFullscreenButton = this.state.showFullscreenButton
      && window.mobileDetect
      && screenfull.enabled
      && !this.props.isFullScreen
    const showSettingsButton = this.props.session.authorized
    return (
      <div className="public-app">
        {showFullscreenButton ? this.renderFullscreenButton() : null}
        {showSettingsButton ? this.renderSettingsButton() : null}
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFullScreen: state.ui.settings.isFullScreen,
    trip: state.data.trip,
    session: state.session
  };
};

export default connect(mapStateToProps, appActions)(App)
