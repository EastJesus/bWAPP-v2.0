import { call, put, takeEvery, take, all } from "redux-saga/effects";
import axios from "axios";
import { push } from "react-router-redux";
import { toast } from "react-toastify";
import history from "../history";
const { noun, verb } = require("plural-ru");

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

export const OPEN_TEST_QUESTIONS_REQUEST = "OPEN_TEST_QUESTIONS_REQUEST"
export const OPEN_TEST_QUESTIONS_SUCCESS = "OPEN_TEST_QUESTIONS_SUCCESS"

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

export const GET_TEST_CHART_REQUEST = "GET_TEST_CHART_REQUEST"
export const GET_TEST_CHART_SUCCESS = "GET_TEST_CHART_SUCCESS"

export const GET_TEST_PIE_CHART_REQUEST = "GET_TEST_PIE_CHART_REQUEST"
export const GET_TEST_PIE_CHART_SUCCESS = "GET_TEST_PIE_CHART_SUCCESS"

export const GET_TESTS_RESULTS_REQUEST = "GET_TESTS_RESULTS_REQUEST"
export const GET_TESTS_RESULTS_SUCCESS = "GET_TESTS_RESULTS_SUCCESS"

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

export const openTestQuestions = (id) => {
    return {
        type: OPEN_TEST_QUESTIONS_REQUEST,
        payload: id
    }
}

export const passTest = (testid, all_questions, questions) => {
    return {
        type: PASS_TEST_REQUEST,
        payload: {testid, all_questions, questions}
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

export const getTestChart = () => {
    return {
        type: GET_TEST_CHART_REQUEST
    }
}

export const getTestPieChart = () => {
    return {
        type: GET_TEST_PIE_CHART_REQUEST
    }
}

export const getTestsResults = () => {
    return {
        type: GET_TESTS_RESULTS_REQUEST
    }
}

/*
    SAGAS
*/


export const getCoursesSaga = function*() {
  while (true) {
    const { payload } = yield take(GET_COURSES_REQUEST);

    try {
      let config = {
        headers: {
          Authorization: `Token ${localStorage.token}`
        }
      };  
      const { data } = yield axios.get(`${api}/courses/`, config);

      yield put({
        type: GET_COURSES_SUCCESS,
        payload: data
      });

    } catch (err) {
        toast.error(err.response.data.detail, {
          position: toast.POSITION.BOTTOM_LEFT
        });
      console.log(err);
    }
  }
};

export const getTestsSaga = function*() {
    while(true) {
        yield take(GET_TESTS_REQUSET)

        try {
            let config = {
              headers: {
                Authorization: `Token ${localStorage.token}`
              }
            };
            const {data} = yield axios.get(`${api}/tests/`, config)

            yield put({
                type: GET_TESTS_SUCCESS,
                payload: data
            })

        } catch (err) {
            toast.error(err.response.data.detail, {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.log(err)
        }
    }
}

export const getQueryTestSaga = function* () {
    while(true) {
       const {payload} = yield take(GET_QUERY_TEST_REQUEST)
        
       try {
        let config = {
          headers: {
            Authorization: `Token ${localStorage.token}`
          }
        };   
        const {data} = yield axios.get(`${api}/tests/${payload}/`, config)

        yield put({
            type: GET_QUERY_TEST_SUCCESS,
            payload: data
        })

       } catch (err) {
           toast.error(err.response.data.detail, {
             position: toast.POSITION.BOTTOM_LEFT
           });
           console.log(err)
       }
    }
}

export const openTestQuestionsSaga = function* () {
    while(true) {
       const {payload} = yield take(OPEN_TEST_QUESTIONS_REQUEST)
        
       try {
        let config = {
          headers: {
            Authorization: `Token ${localStorage.token}`
          }
        };   
        const {data} = yield axios.get(`${api}/tests/${payload}/load_questions`, config)

        yield put({
            type: OPEN_TEST_QUESTIONS_SUCCESS,
            payload: data
        })

       } catch (err) {
           toast.error(err.response.data.detail, {
             position: toast.POSITION.BOTTOM_LEFT
           });
           console.log(err)
       }
    }
}

export const passTestSaga = function* () {
    while (true) {
        const {payload} = yield take(PASS_TEST_REQUEST)
        
        try {
            let config = {
              headers: {
                Authorization: `Token ${localStorage.token}`
              }
            };
            
            const {data} = yield axios.post(
                `${api}/passed_tests/`,
                payload,
                config
            )

            const correct_answers = noun(
              data.correct_answers,
              "%d вопрос",
              "%d вопроса",
              "%d вопросов"
            );
            
            const score = noun(data.score, "%d балл", "%d балла", "%d баллов");

            const info = `Вы правильно ответили на ${correct_answers} ${" "}
            из ${data.all_answers}. В сумме вы набрали ${score}.`;

            yield put({
                type: PASS_TEST_SUCCESS
            })
            console.log(data)
            
            yield toast.info(info, {
                position: toast.POSITION.BOTTOM_LEFT
            })

        } catch (err) {
            toast.error(err.response.data.detail, {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.log(err)
        }
    }
}

export const loginSaga = function* () {
    while(true) {
        const {payload} = yield take(LOGIN_REQUEST)

        try {
            const {data} = yield axios.post(`${api}/rest-auth/login/`, payload)

            yield put({
                type: LOGIN_SUCCESS
            })

            console.log(data);
            localStorage.token = data.key;

            yield put(push('/competence_center/courses'))

            yield put({
                type: GET_MY_INFO_REQUEST,
            })

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

            yield axios.post(`${api}/rest-auth/logout/`)

            yield put({
                type: LOGOUT_SUCCESS
            })

            localStorage.token = null

            toast.success("Вы успешно вышли", {
              position: toast.POSITION.BOTTOM_LEFT
            });
        } catch (err) {
            toast.error(err.response.data.detail, {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.log(err)
        }
    }
}

export const getUserSaga = function* () {
    while(true) {
        const {payload} = yield take(GET_USER_REQUEST)

        try {
            let config = {
              headers: {
                Authorization: `Token ${localStorage.token}`
              }
            };

            const {data} = yield axios.get(`${api}/users/?username=${payload.username}`, config)

            console.log(data)
            yield put({
                type: GET_USER_SUCCESS,
                payload: data[0]
            })

        } catch (err) {
            toast.error(err.response.data.detail, {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.log(err)
        }
    }
}

export const getMyInfoSaga = function* () {
    while(true) {
        yield take(GET_MY_INFO_REQUEST)

        try {
           let config = {
             headers: {
               Authorization: `Token ${localStorage.token}`
             }
           };

            const {data} = yield axios.get(
                `${api}/rest-auth/user/`,
                config,
            )

            yield put({
                type: GET_MY_INFO_SUCCESS,
                payload: data
            })
        } catch (err) {
            toast.error(err.response.data.detail, {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.log(err)
        }
    }
}

export const getTestChartSaga = function* () {
    while(true) {
        yield take(GET_TEST_CHART_REQUEST)

        try {
           let config = {
             headers: {
               Authorization: `Token ${localStorage.token}`
             }
           };

            const {data} = yield axios.get(
                `${api}/passed_tests/tests_chart`,
                config,
            )
            console.log(data)
            yield put({
                type: GET_TEST_CHART_SUCCESS,
                payload: data
            })
        } catch (err) {
            toast.error(err.response.data.detail, {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.log(err)
        }
    }
}

export const getTestPieChartSaga = function* () {
    while(true) {
        yield take(GET_TEST_PIE_CHART_REQUEST)

        try {
           let config = {
             headers: {
               Authorization: `Token ${localStorage.token}`
             }
           };

            const {data} = yield axios.get(
                `${api}/passed_tests/questions_pie_chart`,
                config,
            )
            console.log(data)
            yield put({
                type: GET_TEST_PIE_CHART_SUCCESS,
                payload: data
            })
        } catch (err) {
            toast.error(err.response.data.detail, {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.log(err)
        }
    }
}

export const getTestsResultsSaga = function* () {
    while(true) {
        yield take(GET_TESTS_RESULTS_REQUEST)

        try {
           let config = {
             headers: {
               Authorization: `Token ${localStorage.token}`
             }
           };

            const {data} = yield axios.get(
                `${api}/students/test_results`,
                config,
            )
            console.log(data)
            yield put({
                type: GET_TESTS_RESULTS_SUCCESS,
                payload: data
            })
        } catch (err) {
            toast.error(err.response.data.detail, {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.log(err)
        }
    }
}