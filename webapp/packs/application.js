import React from 'react'
import ReactDOM from 'react-dom'
import storejs from 'storejs'
import throttle from 'lodash/throttle'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ActionCable from 'actioncable'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import Root from '../src/components/Root/Root'
import reducer from '../src/reducers'
import '../src/index.css'

const storedCenter = (localStorage && storejs.get('center')) || window.JsEnv.hot_point
const storedZoom = (localStorage && storejs.get('zoom')) || 13
let storedFollowTarget = false
if (localStorage && storejs.has('followTarget')) {
  storedFollowTarget = storejs.get('followTarget')
}

const mobileMediaQuery = window.matchMedia('(max-width: 750px)')
const onScreenMaxWidthChange = (mql) => {
  window.mobileDetect = mql.matches
}
onScreenMaxWidthChange(mobileMediaQuery)
mobileMediaQuery.addListener(onScreenMaxWidthChange)

const initStore = {
  webSocket: ActionCable.createConsumer(),
  followTarget: storedFollowTarget,
  center: storedCenter,
  zoom: storedZoom,
  intPoints: [],
  minZoom: 4,
  maxZoom: 16,
  tracks: [],
  hotPoint: window.JsEnv.hot_point,
  hotPoints: [],
  routing: {},
  isFullscreen: false,
  ajax: {
    intPoints: false,
    hotPoints: false,
    tracks: false
  }
}

const browserHistory = createHistory()
const store = createStore(reducer, initStore, applyMiddleware(routerMiddleware(browserHistory)))

store.subscribe(throttle(() => {
  let {followTarget, center, zoom} = store.getState()
  storejs.set('followTarget', followTarget)
  storejs.set('center', center)
  storejs.set('zoom', zoom)
}, 700))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <Root/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
