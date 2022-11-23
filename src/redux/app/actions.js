import * as actions from "./constants"

export const getProfile = id => ({
  type: actions.APP_GET_PROFILE_REQUEST,
  id
})

export const updateProfile = (profile, token) => ({
  type: actions.APP_UPDATE_PROFILE_REQUEST,
  profile,
  token
})

export const getUsers = () => ({
  type: actions.APP_GET_USERS_REQUEST
})

export const signDoc = (values, navigation) => ({
  type: actions.APP_GET_SIGNDOC_REQUEST,
  values,
  navigation
})
