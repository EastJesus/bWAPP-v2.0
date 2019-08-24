import { call, put, takeEvery, retry } from "redux-saga/effects";
import axios from "axios";
import Swal from "sweetalert2";

import api from '../config'

const requestAuth = () => {
  return { type: "REQUEST_AUTH" };
};

const requestDeactivateAuth = () => {
  return { type: "REQUEST_DEACTIVATE_AUTH" };
}

const authSuccess = user => {
  return {
    type: "AUTH_SUCCESS",
    currentUser: user
  };
};

const deactivateAuthSuccess = () => {
  return {
    type: "DEACTIVATE_AUTH_SUCCESS"
  };
};

const authFailed = () => {
  return { type: "AUTH_FAILED" };
};

export const authUser = (login, password) => {
    return {
        type: 'AUTH_USER',
        user: {
            login: login,
            password: password
        }
    }
}

export const deactivateAuth = () => {
  return {
    type: 'DEACTIVATE_AUTH'
  }
}

export function* authWatcher() {
  yield takeEvery("AUTH_USER", authProccess);
}

export function* deactivateAuthWatcher() {
  yield takeEvery("DEACTIVATE_AUTH", deactivateAuthProccess)
}

function* authProccess(action) {
  yield put(requestAuth());
  let data = {
    isAuth: false,
    user: null
  }
  data = yield call(() => {
    return axios
      .get(`${api}/auth/${action.user.login}`)
      .then(res => {
        const user = res.data[0];
        
        if (res.data.length > 0) {
          if (action.user.password === user.password) {
            Swal.fire(
              `Вы успешно авторизовались как ${action.user.login}`,
              "",
              "success"
            );
            setTimeout(() => {
              //this.props.history.push("/");
            }, 1500);
            data.isAuth = true;
            data.user = user
            return data;
          } else {
            Swal.fire({
              type: "error",
              title: "Логин или пароль введены неверно"
            });
            data.isAuth = false;
            return data;
          }
        } else {
          Swal.fire({
            type: "error",
            title: "Логин или пароль введены неверно"
          });
          data.isAuth = false;
          return data;
        }
      });
  });
  if (data.isAuth) {
    yield put(authSuccess(data.user));
    localStorage.isAuth = true
    localStorage.user = action.user.login
    localStorage.isAdmin = data.user.isAdmin
  } else {
    yield put(authFailed());
  }
}

function* deactivateAuthProccess(action) {
  yield put(requestDeactivateAuth())
  localStorage.isAuth = false
  localStorage.user = null
  localStorage.isAdmin = false
  yield put(deactivateAuthSuccess())
}