import { all } from "redux-saga/effects"

import AuthSaga from "./auth/sagas"
import AppSaga from "./app/sagas"

export function* mainSaga() {
  yield all([
    // other sagas go here
    AuthSaga,
    AppSaga
  ])
}
