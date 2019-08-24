import { combineReducers } from "redux"
import {reducer} from "./info"
import {authReducer} from './auth'
import { connectRouter } from 'connected-react-router'  

import history from '../history'

export default combineReducers({
    reducer,
    authReducer,
    router: connectRouter(history)
})
