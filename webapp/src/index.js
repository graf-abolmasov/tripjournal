import React from 'react';
import ReactDOM from 'react-dom';
import storejs from 'storejs';
import throttle from 'lodash/throttle';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import Root from './components/Root/Root';
import reducer from './reducers'
import './index.css';

const storedCenter = (localStorage && storejs.get('center')) || window.JsEnv.hot_point;
const storedZoom   = (localStorage && storejs.get('zoom')) || 13;
let storedFollowTarget = false;
if (localStorage && storejs.has('followTarget')) {
  storedFollowTarget = storejs.get('followTarget')
}

let mobileMediaQuery = window.matchMedia('(max-width: 750px)');
mobileMediaQuery.addListener((mql) => {
  window.mobileDetect = mql.matches;
});
window.mobileDetect = mobileMediaQuery.matches;

const initStore = {
  webSocket: window.ActionCable.createConsumer(),
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
};

const store = createStore(reducer, initStore, applyMiddleware(routerMiddleware(browserHistory)));
const history = syncHistoryWithStore(browserHistory, store);

store.subscribe(throttle(() => {
  let { followTarget, center, zoom } = store.getState();
  storejs.set('followTarget', followTarget);
  storejs.set('center', center);
  storejs.set('zoom', zoom);
}, 700));

ReactDOM.render(
  <Provider store={store}>
    <Root history={history} />
  </Provider>,
  document.getElementById('root')
);
