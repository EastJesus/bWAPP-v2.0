import { call, put, takeEvery, take, all } from "redux-saga/effects";
import axios from "axios";
import { push } from "react-router-redux";
import { toast } from "react-toastify";
import history from "../history";

const api = "http://127.0.0.1:8000/api";

/*
    ACTIONS
*/

export const GET_COURSES_REQUEST = 'GET_COURSES_REQUEST'
export const GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS'

export const GET_TESTS_REQUSET = "GET_TESTS_REQUSET"
export const GET_TESTS_SUCCESS = "GET_TESTS_SUCCESS"

export const GET_QUERY_TEST_REQUEST = "GET_QUERY_TEST_REQUEST"
export const GET_QUERY_TEST_SUCCESS = "GET_QUERY_TEST_SUCCESS" 

export const PASS_TEST_REQUEST = "PASS_TEST_REQUEST" 
export const PASS_TEST_SUCCESS = "PASS_TEST_SUCCESS" 

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"

export const GET_USER_REQUEST = "GET_USER_REQUEST"
export const GET_USER_SUCCESS = "GET_USER_SUCCESS"

export const GET_MY_INFO_REQUEST = "GET_MY_INFO_REQUEST"
export const GET_MY_INFO_SUCCESS = "GET_MY_INFO_SUCCESS"

/*
    ACTION CREATORS
*/

export const getCourses = () => {
    return {
        type: GET_COURSES_REQUEST
    }
}

export const getTests = () => {
    return {
        type: GET_TESTS_REQUSET
    }
}

export const getQueryTest = (id) => {
    return {
        type: GET_QUERY_TEST_REQUEST,
        payload: id
    }
}

export const passTest = (testid, questions) => {
    return {
        type: PASS_TEST_REQUEST,
        payload: {testid, questions}
    }
}

export const login = (username, password) => {
    return {
        type: LOGIN_REQUEST,
        payload: {username, password}
    }
}

export const logout = () => {
    return {
        type: LOGOUT_REQUEST
    }
}

export const getUser = (username) => {
    return {
        type: GET_USER_REQUEST,
        payload: {username}
    }
}

export const getMyInfo = () => {
    return {
        type: GET_MY_INFO_REQUEST
    }
}

/*
    SAGAS
*/


export const getCoursesSaga = function*() {
  while (true) {
    const { payload } = yield take(GET_COURSES_REQUEST);

    try {
      const { data } = yield axios.get(`${api}/courses/`);

      yield put({
        type: GET_COURSES_SUCCESS,
        payload: data
      });

    } catch (err) {
      console.log(err);
    }
  }
};

export const getTestsSaga = function*() {
    while(true) {
        yield take(GET_TESTS_REQUSET)

        try {
            const {data} = yield axios.get(`${api}/tests/`)

            yield put({
                type: GET_TESTS_SUCCESS,
                payload: data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getQueryTestSaga = function* () {
    while(true) {
       const {payload} = yield take(GET_QUERY_TEST_REQUEST)
        
       try {
        const {data} = yield axios.get(`${api}/tests/${payload}/`)

        yield put({
            type: GET_QUERY_TEST_SUCCESS,
            payload: data
        })

       } catch (err) {
           console.log(err)
       }
    }
}

export const passTestSaga = function* () {
    while (true) {
        const {payload} = yield take(PASS_TEST_REQUEST)

        try {
            yield axios.post(
                `${api}/passed_tests/`,
                payload,
                JSON.stringify({headers: {  'Content-Type': 'text/html', 'X-CSRFToken': 'Bjmy3ivR9zPu95hidQI3r5sxSXTCZx2H9sZVTb4dnsXgmLLSMKpegGL2dqg775NX'}})
            )

            yield put({
                type: PASS_TEST_SUCCESS
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const loginSaga = function* () {
    while(true) {
        const {payload} = yield take(LOGIN_REQUEST)

        try {
            const {data} = yield axios.post(`${api}/auth/token/login`, payload)

            yield put({
                type: LOGIN_SUCCESS
            })

            yield put({
                type: GET_USER_REQUEST,
                payload: payload.username
            })
            console.log(data)
            localStorage.token = data.auth_token

            toast.success("Вы успешно авторизованы", {
              position: toast.POSITION.BOTTOM_LEFT
            });
            

        } catch (err) {
            toast.error("Вы ввели неправильный логин или пароль", {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.log(err)
        }
    }
}

export const logoutSaga = function* () {
    while(true) {
        yield take(LOGOUT_REQUEST)

        try {
            yield put({
                type: LOGOUT_SUCCESS
            })

            localStorage.token = null

            toast.success("Вы успешно вышли", {
              position: toast.POSITION.BOTTOM_LEFT
            });
        } catch (err) {
            console.log(err)
        }
    }
}

export const getUserSaga = function* () {
    while(true) {
        const {payload} = yield take(GET_USER_REQUEST)

        try {
            const {data} = yield axios.get(`${api}/users/?username=${payload}`)

            console.log(data)
            yield put({
                type: GET_USER_SUCCESS,
                payload: data[0]
            })

        } catch (err) {
            console.log(err)
        }
    }
}

export const getMyInfoSaga = function* () {
    while(true) {
        yield take(GET_MY_INFO_REQUEST)

        try {
            const {data} = yield axios.post(
                `${api}/auth/users/me`,
                JSON.stringify({headers: {  'Content-Type': 'text/html', 'Authorization': `Token ${localStorage.token}`}})
            )

            yield put({
                type: GET_MY_INFO_SUCCESS,
                payload: data
            })
        } catch (err) {
            console.log(err)
        }
    }
}