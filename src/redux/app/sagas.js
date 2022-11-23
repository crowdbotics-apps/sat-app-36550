import { all, takeLatest, put, call } from "redux-saga/effects"
import axios from "axios"
import { Alert } from "react-native"
import * as actions from "./constants"
import { BASE_URL, request } from "../../utils/http"
import { sagasRunner } from "../../utils/redux"

function getProfile() {
  return request.get("/accounts/api/v1/profile/")
}

function updateProfile({ profile, token }) {
  const profileKeys = Object.keys(profile)
  const data = new FormData()
  profileKeys.forEach(k => {
    data.append(k, profile[k])
  })
  return axios({
    method: "patch",
    url: `${BASE_URL}/api/v1/accounts/profile/`,
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data"
    },
    data
  })
}

function handleGetProfile({ id }) {
  return sagasRunner({
    successType: actions.APP_GET_PROFILE_SUCCESS,
    errorType: actions.APP_GET_PROFILE_ERROR,
    loadingType: actions.APP_CHANGE_LOADING_STATE,
    errorMessage: "Unable to get profile data.",
    callFunc: getProfile,
    alertError: true,
    callData: { id },
    isProfile: true
  })
}

function handleUpdateProfile({ profile, token }) {
  return sagasRunner({
    successType: actions.APP_UPDATE_PROFILE_SUCCESS,
    errorType: actions.APP_UPDATE_PROFILE_ERROR,
    loadingType: actions.APP_CHANGE_LOADING_STATE,
    errorMessage: "Something went wrong. Please try again.",
    updateType: actions.APP_GET_PROFILE_REQUEST,
    alertError: true,
    sendToken: true,
    callFunc: updateProfile,
    callData: { profile, token },
    onSuccess: () => Alert.alert("Successfully updated")
  })
}

function getUsers() {
  return request.get(`/accounts/api/v1/users/`)
}

function handleGetUsers({ id }) {
  return sagasRunner({
    successType: actions.APP_GET_USERS_SUCCESS,
    errorType: actions.APP_GET_USERS_ERROR,
    loadingType: actions.APP_CHANGE_LOADING_STATE,
    errorMessage: "Unable to get Users.",
    callFunc: getUsers,
    callData: { id }
  })
}

function sendSign(values) {
  return request.post("/documents/docusign/get-access-code/", values)
}

function* handleSignDoc({ values, navigation }) {
  try {
    const { status, data } = yield call(sendSign, values)

    if (status === 200) {
      yield put({
        type: actions.APP_GET_SIGNDOC_SUCCESS,
        values
      })
      // Alert.alert(data.detail)
      navigation.navigate("SigningScreen", { item: data })
    } else {
      yield put({
        type: actions.APP_GET_SIGNDOC_ERROR,
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
      type: actions.APP_GET_SIGNDOC_ERROR,
      error: "Can't sign doc right now"
    })
  }
}

export default all([
  takeLatest(actions.APP_GET_PROFILE_REQUEST, handleGetProfile),
  takeLatest(actions.APP_UPDATE_PROFILE_REQUEST, handleUpdateProfile),
  takeLatest(actions.APP_GET_USERS_REQUEST, handleGetUsers),
  takeLatest(actions.APP_GET_SIGNDOC_REQUEST, handleSignDoc)
])
