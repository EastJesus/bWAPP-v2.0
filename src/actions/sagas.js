import { all } from 'redux-saga/effects'
import {watchOneUserProcess, watchUsersProcess, watchAddUser, watchDeleteUser} from './users'
import {authWatcher, deactivateAuthWatcher} from './auth'
import {getCoursesSaga, getTestsSaga, getQueryTestSaga, passTestSaga, loginSaga, logoutSaga, getUserSaga, getMyInfoSaga} from './competence_center'


export function* rootSaga() {
    yield all([
        watchOneUserProcess(),
        watchUsersProcess(),
        authWatcher(),
        deactivateAuthWatcher(),
        watchAddUser(),
        watchDeleteUser(),
        getCoursesSaga(),
        getTestsSaga(),
        getQueryTestSaga(),
        passTestSaga(),
        loginSaga(),
        getUserSaga(),
        logoutSaga(),
        getMyInfoSaga()
    ])
}