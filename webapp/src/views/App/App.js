import React from 'react'
import { connect } from 'react-redux'
import { identity } from "ramda"
import screenfull from 'screenfull'
import appActions from "./app-actions"

import './App.scss'

class App extends React.Component {

  componentDidMount() {
    this.props.start()
  }

  render() {
    const showFullscreenButton = window.mobileDetect && screenfull.enabled && !this.props.isFullscreen

    return (
      <div id="appContainer">
        {showFullscreenButton ? (
          <div id="fullScreenBtnContainer">
            <span>Перейти в полный экран</span>
            <button onClick={this.props.requestFullscreen}>
              <i className="ion ion-android-expand"/>
            </button>
          </div>
        ) : null}
        {this.props.children}
      </div>
    )
  }
}

export default connect(identity, appActions)(App)
