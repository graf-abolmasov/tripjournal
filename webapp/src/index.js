import React from 'react';
import ReactDOM from 'react-dom';
import storejs from 'storejs';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App/App';
import reducer from './reducers'
import './index.css';

const storedCenter = (localStorage && storejs.get('center')) || { lat: 51.505, lng: -0.09};
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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
