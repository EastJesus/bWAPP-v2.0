import { all } from 'redux-saga/effects'
import {watchOneUserProcess, watchUsersProcess, watchAddUser, watchDeleteUser} from './users'
import {authWatcher, deactivateAuthWatcher} from './auth'

export function* rootSaga() {
    yield all([
        watchOneUserProcess(),
        watchUsersProcess(),
        authWatcher(),
        deactivateAuthWatcher(),
        watchAddUser(),
        watchDeleteUser()
    ])
}