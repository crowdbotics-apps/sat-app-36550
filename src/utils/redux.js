import { put, call, select } from "redux-saga/effects"
import { Alert } from "react-native"

import { navigate } from "../Navigation"

const getToken = state => state.Auth.accessToken

export function* sagasRunner({
  successType,
  errorType,
  errorMessage,
  route,
  callFunc,
  callData,
  updateType,
  keepLoadngTrue,
  additionalData = {},
  updateType2,
  updateData = {},
  updateData2 = {},
  loadingType,
  routeParams,
  onSuccess,
  successData,
  alertError,
  sendToken
}) {
  try {
    if (loadingType) {
      yield put({
        type: loadingType,
        payload: true
      })
    }

    let callArgs = callData

    if (sendToken) {
      const token = yield select(getToken)

      callArgs = {
        ...callData,
        token
      }
    }
    const { status, data } = yield call(callFunc, callArgs)
    console.log("successType", successType)
    console.log("data", data)
    if (status >= 200 && status < 300) {
      yield put({
        ...additionalData,
        type: successType,
        payload: data
      })

      if (updateType) {
        yield put({
          ...updateData,
          type: updateType
        })
      }

      if (updateType2) {
        yield put({ ...updateData2, type: updateType2 })
      }

      if (onSuccess) {
        yield call(onSuccess, data, successData)
      }

      if (loadingType && !keepLoadngTrue) {
        yield put({
          type: loadingType,
          payload: false
        })
      }

      if (route) {
        navigate(route, routeParams)
      }
    } else {
      yield put({
        type: errorType,
        error: "Unknown Error"
      })

      if (loadingType) {
        yield put({
          type: loadingType,
          payload: false
        })
      }
    }
  } catch (error) {
    console.log("error :>> ", error)
    console.log("error.response :>> ", error.response)
    if (loadingType) {
      yield put({
        type: loadingType,
        payload: false
      })
    }

    yield put({
      type: errorType,
      error: error.response?.data?.detail
        ? JSON.stringify(error.response?.data?.detail)
        : JSON.stringify(error.response?.data)
        ? JSON.stringify(error.response?.data)
        : errorMessage
    })

    if (alertError) {
      Alert.alert(
        errorMessage,
        error.response?.data ? JSON.stringify(error.response?.data) : ""
      )
    }
  }
}
