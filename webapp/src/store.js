import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import throttle from 'lodash/throttle'
import storejs from 'storejs'

import reducer from './reducer'
import saga from './saga'

const storedCenter = (localStorage && storejs.get('center')) || window.JsEnv.hot_point
const storedZoom = (localStorage && storejs.get('zoom')) || 13
let storedFollowTarget = false
if (localStorage && storejs.has('followTarget')) {
  storedFollowTarget = storejs.get('followTarget')
}

const initStore = {
  followTarget: storedFollowTarget,
  center: storedCenter,
  zoom: storedZoom,
  intPoints: [],
  minZoom: 4,
  maxZoom: 16,
  tracks: [],
  hotPoint: window.JsEnv.hot_point,
  hotTrack: [],
  selectedIntPointIndex: 0,
  routing: {},
  isFullscreen: false,
  ajax: {
    intPoints: false,
    hotTrack: false,
    tracks: false
  }
}

const browserHistory = createHistory()
const sagaMiddleware = createSagaMiddleware()
const middlewares = applyMiddleware(
  routerMiddleware(browserHistory),
  sagaMiddleware
)

const store = createStore(reducer, initStore, composeWithDevTools(middlewares))
store.subscribe(throttle(() => {
  let {followTarget, center, zoom} = store.getState()
  storejs.set('followTarget', followTarget)
  storejs.set('center', center)
  storejs.set('zoom', zoom)
}, 700))

sagaMiddleware.run(saga)

export const history = browserHistory

export default store
