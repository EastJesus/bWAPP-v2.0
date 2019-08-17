import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import activate, {deactivate} from './authAction.js'

function* activateRequest(payload) {
    try {
        yield put(activate(payload.isAuth, payload.login, payload.isAdmin))
    } catch(e) {
        yield put ({ type: "ACTIVATE_FAILED", payload: e.message})
    }
}

function* deactivateRequest(payload) {
    try {
        yield put(deactivate())
    } catch(e) {
        yield put ({ type: "ACTIVATE_FAILED", payload: e.message})
    }
}

function* activateSaga() {
    yield takeEvery("ACTIVATE_REQUEST", activateRequest)
}

function* deactivateSaga() {
    yield takeEvery("DEACTIVATE_REQUEST", deactivateRequest)
}


export default activateSaga