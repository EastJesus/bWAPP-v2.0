import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import reducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import {rootSaga} from './actions/sagas'
import history from './history'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), logger)
const store = createStore(reducer, enhancer)
sagaMiddleware.run(rootSaga)
export default store