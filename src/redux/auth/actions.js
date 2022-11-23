import * as actions from "./constants"

export const signUp = values => ({
  type: actions.AUTH_SIGNUP_REQUEST,
  values
})

export const login = values => ({
  type: actions.AUTH_LOGIN_REQUEST,
  values
})

export const logout = () => ({
  type: actions.AUTH_LOGOUT
})

export const resetPassword = (values, navigation) => ({
  type: actions.AUTH_PASSWORD_RECOVER_REQUEST,
  values,
  navigation
})

export const setUser = (user, token) => ({
  type: actions.AUTH_USER,
  user,
  token
})
export const passConfirm = (values, navigation) => ({
  type: actions.AUTH_PASSWORD_RESET_REQUEST,
  values,
  navigation
})
