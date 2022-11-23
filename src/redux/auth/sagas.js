import { all, takeLatest, put, call } from "redux-saga/effects"

import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_ERROR,
  AUTH_SIGNUP_REQUEST,
  AUTH_PASSWORD_RECOVER_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_SIGNUP_ERROR,
  AUTH_SIGNUP_SUCCESS,
  AUTH_PASSWORD_RECOVER_SUCCESS,
  AUTH_PASSWORD_RECOVER_ERROR,
  AUTH_LOGOUT,
  AUTH_PASSWORD_RESET_SUCCESS,
  AUTH_PASSWORD_RESET_ERROR,
  AUTH_PASSWORD_RESET_REQUEST
} from "./constants"
import { request, addTokenToHttp } from "../../utils/http"
import StorageUtils from "../../utils/storage"
import { Alert } from "react-native"
import { getProfile } from "../app/actions"
import { APP_CLEAR_STATE } from "../app/constants"
import { getServerError } from "../../utils/helpers"
import { isWeb } from "../../utils/isweb"

function sendLogin({ values }) {
  return request.post("/accounts/api/v1/login/token/", {
    username: values.email,
    password: values.password
  })
}

function sendSignUp({ values }) {
  return request.post("/api/v1/accounts/signup/", values)
}

function resetConfirm(values) {
  // console.log("values reset confirm sagas", values)
  return request.post("/accounts/api/v1/password-reset/confirm/", values)
}

function sendPasswordRecovery(values) {
  return request.post("/accounts/api/v1/password-reset/", values)
}

function* handleLogin(values) {
  try {
    const { status, data } = yield call(sendLogin, values)

    if (status === 200) {
      yield put({
        type: AUTH_LOGIN_SUCCESS,
        accessToken: data.key,
        user: data.user
      })

      StorageUtils.setAccessToken(data.key)
      StorageUtils.setUser(data.user)
      addTokenToHttp(data.key)
      yield put(getProfile())
    } else {
      yield put({
        type: AUTH_LOGIN_ERROR,
        error: "Unknown Error"
      })
    }
  } catch (error) {
    const e = getServerError(
      error.response.data,
      "Can't sign in with provided credentials"
    )
    yield put({
      type: AUTH_LOGIN_ERROR,
      error: e
    })
    Alert.alert(e)
  }
}

function* handleSignUp(values) {
  try {
    const { status } = yield call(sendSignUp, values)

    if (status === 201) {
      yield put({
        type: AUTH_SIGNUP_SUCCESS
      })

      const loginInfo = yield call(sendLogin, values)

      if (loginInfo.status === 200) {
        yield put({
          type: AUTH_LOGIN_SUCCESS,
          accessToken: loginInfo.data.key,
          email: loginInfo.data.email
        })

        StorageUtils.setAccessToken(loginInfo.data.key)
        StorageUtils.setUser(loginInfo.data.user)
        addTokenToHttp(loginInfo.data.key)
        yield put(getProfile())
      }
    } else {
      yield put({
        type: AUTH_SIGNUP_ERROR,
        error: "Unknown Error"
      })
    }
  } catch (error) {
    const e = getServerError(
      error.response.data,
      "Can't sign up with provided credentials"
    )
    yield put({
      type: AUTH_SIGNUP_ERROR,
      error:
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data) ||
        "Can't sign up with provided credentials"
    })
    Alert.alert(e)
  }
}

function* handlePasswordRecovery({ values, navigation }) {
  try {
    const { status, data } = yield call(sendPasswordRecovery, values)

    if (status === 200) {
      yield put({
        type: AUTH_PASSWORD_RECOVER_SUCCESS,
        values
      })
      // you can change the navigate for navigateAndResetStack to go to a protected route
      Alert.alert(data.detail)
      navigation.navigate("TokenInput", { itemEmail: values })
      // navigationActions.navigate('Login');
    } else {
      yield put({
        type: AUTH_PASSWORD_RECOVER_ERROR,
        error: "Unknown Error"
      })
    }
  } catch (error) {
    console.log("error.response :>> ", error.response)
    const e =
      error?.response?.data?.email?.length > 0
        ? error.response.data.email[0]
        : "Something went wrong "
    Alert.alert(e)
    yield put({
      type: AUTH_PASSWORD_RECOVER_ERROR,
      error: "Can't recover password with provided email"
    })
  }
}

function* handleLogout() {
  try {
    StorageUtils.removeAccessToken()
    StorageUtils.removeUser()
    addTokenToHttp("")
    yield put({
      type: APP_CLEAR_STATE
    })
    // yield call(logout);
  } catch (error) {
    console.log("error :>> ", error)
  }
}

function* handleResetConfirm({ values, navigation }) {
  try {
    const { status, data } = yield call(resetConfirm, values)

    if (status === 200) {
      yield put({
        type: AUTH_PASSWORD_RESET_SUCCESS,
        values
      })
      // you can change the navigate for navigateAndResetStack to go to a protected route
      Alert.alert(data.detail)
      isWeb()
        ? navigation.navigate("Login")
        : navigation.navigate("PasswordSuccess")
    } else {
      yield put({
        type: AUTH_PASSWORD_RESET_ERROR,
        error: "Unknown Error"
      })
    }
  } catch (error) {
    console.log("error.response :>> ", error.response)
    const e =
      error?.response?.data?.email?.length > 0
        ? error.response.data.email[0]
        : "Something went wrong "
    Alert.alert(e)
    yield put({
      type: AUTH_PASSWORD_RESET_ERROR,
      error: "Can't recover password with provided email"
    })
  }
}

export default all([
  takeLatest(AUTH_LOGIN_REQUEST, handleLogin),
  takeLatest(AUTH_SIGNUP_REQUEST, handleSignUp),
  takeLatest(AUTH_PASSWORD_RECOVER_REQUEST, handlePasswordRecovery),
  takeLatest(AUTH_PASSWORD_RESET_REQUEST, handleResetConfirm),
  takeLatest(AUTH_LOGOUT, handleLogout)
])
