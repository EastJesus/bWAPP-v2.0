import { all } from "redux-saga/effects";
import {saga as courseSaga} from '../actions/competence_center'

export default function* rootSaga() {
  yield all([
    courseSaga()
  ]);
}