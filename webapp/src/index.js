import React from 'react';
import ReactDOM from 'react-dom';
import storejs from 'storejs';
import throttle from 'lodash/throttle';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App/App';
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
  hotPoints: []
};

const store = createStore(reducer, initStore);

store.subscribe(throttle(() => {
  let { followTarget, center, zoom } = store.getState();
  storejs.set('followTarget', followTarget);
  storejs.set('center', center);
  storejs.set('zoom', zoom);
}, 700));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
