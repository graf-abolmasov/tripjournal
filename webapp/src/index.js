import React from 'react';
import ReactDOM from 'react-dom';
import storejs from 'storejs';
import throttle from 'lodash/throttle';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore  } from 'react-router-redux'
import Root from './components/Root/Root';
import reducer from './reducers'
import './index.css';

const storedCenter = (localStorage && storejs.get('center')) || window.JsEnv.hot_point;
const storedZoom   = (localStorage && storejs.get('zoom')) || 13;
let storedFollowTarget = false;
if (localStorage && storejs.has('followTarget')) {
  storedFollowTarget = storejs.get('followTarget')
}

const initStore = {
  webSocket: window.ActionCable.createConsumer(),
  followTarget: storedFollowTarget,
  center: storedCenter,
  zoom: storedZoom,
  pins: [],
  tracks: [],
  hotPoint: window.JsEnv.hot_point,
  hotPoints: [],
  routing: {}
};

const store = createStore(reducer, initStore);
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
