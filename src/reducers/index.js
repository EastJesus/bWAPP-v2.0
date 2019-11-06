import { combineReducers } from "redux"
import {reducer} from "./info"
import {authReducer} from './auth'
import {competenceCenterReducer} from './competence_center'
import { connectRouter } from 'connected-react-router'  

import history from '../history'

export default combineReducers({
    reducer,
    authReducer,
    competenceCenterReducer,
    router: connectRouter(history)
})
