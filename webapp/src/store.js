import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import throttle from 'lodash/throttle'
import storejs from 'storejs'
import ActionCable from 'actioncable'

import reducer from './reducers'

const storedCenter = (localStorage && storejs.get('center')) || window.JsEnv.hot_point
const storedZoom = (localStorage && storejs.get('zoom')) || 13
let storedFollowTarget = false
if (localStorage && storejs.has('followTarget')) {
  storedFollowTarget = storejs.get('followTarget')
}

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
const middlewares = routerMiddleware(browserHistory)

const store = createStore(reducer, initStore, applyMiddleware(middlewares))
store.subscribe(throttle(() => {
  let {followTarget, center, zoom} = store.getState()
  storejs.set('followTarget', followTarget)
  storejs.set('center', center)
  storejs.set('zoom', zoom)
}, 700))

export const history = browserHistory

export default store
