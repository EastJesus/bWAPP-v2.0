import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import Swal from "sweetalert2";
import api from '../config'
import {push} from "connected-react-router"
import history from '../history';


const requestUsers = () => {
    return { type: 'GET_USERS_REQUEST'}
}

const requestOneUser = () => {
    return { type: 'GET_ONE_USER_REQUEST'}
}

const requestUsersSuccess = (users) => {
    return { 
            type: 'GET_USERS_SUCCESS', 
            users: users
        }
}

const requestOneUserSuccess = (users) => {
    return { 
            type: 'GET_ONE_USER_SUCCESS', 
            users: users
        }
}

const requestUsersError = () => {
    return { type: 'GET_USER_FAILED'}
}

const requestOneUsersError = () => {
    return { type: 'GET_ONE_USER_FAILED'}
}




export const addUserRequest = () => {
    return {
        type: 'ADD_USER_REQUEST'
    }
}

export const addUserSuccess = (user) => {
    return {
        type: 'ADD_USER_SUCCESS',
        user: user
    }
}

export const addUserError = () => {
    return {
        type: 'ADD_USER_ERROR'
    }
}




export const deleteUserRequest = () => {
    return {
        type: 'DELETE_USER_REQUEST'
    }
}

export const deleteUserSuccess = (user) => {
    return {
        type: 'DELETE_USER_SUCCESS',
        user: user
    }
}

export const deleteUserError = (user) => {
    return {
        type: 'DELETE_USER_ERROR',
        user: user
    }
}



export const fetchUsers = () => {
    return { 
            type: 'FETCH_USERS'
        }
}

export const fetchOneUser = (user) => {
    return { 
            type: 'FETCH_ONE_USER',
            user: user
        }
}

export const addUser = (user) => {
    return {
        type: 'ADD_USER',
        user: user
    }
}

export const deleteUser = (user) => {
    return {
        type: 'DELETE_USER',
        user: user
    }
}




// Watchers
export function* watchUsersProcess() {
    yield takeEvery('FETCH_USERS', usersProcess)
}

export function* watchOneUserProcess() {
    yield takeEvery('FETCH_ONE_USER', usersProcess)
}

export function* watchAddUser() {
    yield takeEvery('ADD_USER', addUserSaga)
}

export function* watchDeleteUser() {
    yield takeEvery('DELETE_USER', deleteUserSaga)
}




// Sagas
function* usersProcess(action) {
    try {
        if (action.user) {
            yield put(requestOneUser())
            const data = yield call(() => {
                return axios.get(`${api}/getUser/${action.user}`)
                .then(res => {
                    const users = res.data;
                    return users
                })
            })
            yield put(requestOneUserSuccess(data))
        } else {
            yield put(requestUsers())
            const data = yield call(() => {
            return axios.get(`${api}/allUsers`)
            .then(res => {
                const users = res.data;
                return users
            })
        })
        yield put(requestUsersSuccess(data))
        }
        
    } catch(error) {
        yield put(requestUsersError())
    }
}

function* addUserSaga(action) {
    try {
        yield put(addUserRequest())
        const user = action.user
        yield call(() => {
            axios
                .post(`${api}/newUser`, { user: user })
                .then(function(response) {
                    Swal.fire(
                        '',
                        'Пользователь успешно добавлен',
                        'success'
                    )
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        })
        yield put(addUserSuccess(user))

    } catch(error) {
        yield put(addUserError())
    }
}

function* deleteUserSaga(action) {
    try {
        yield put(deleteUserRequest())
        yield call(() => {
            axios.post(`${api}/deleteUser/${action.user.id}`)
        })
        yield put(deleteUserSuccess(action.user))
        yield put(fetchUsers())
    } catch (error) {
        yield put(deleteUserError())
    }
}