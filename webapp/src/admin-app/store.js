import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'

import reducer from './reducer'
import saga from './saga'

const browserHistory = createHistory()
const sagaMiddleware = createSagaMiddleware()
const middlewares = applyMiddleware(
  routerMiddleware(browserHistory),
  sagaMiddleware
)

const store = createStore(reducer, composeWithDevTools(middlewares))

sagaMiddleware.run(saga)

export const history = browserHistory

export default store
