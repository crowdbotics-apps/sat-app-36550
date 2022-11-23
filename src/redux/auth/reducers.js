import * as actions from "./constants"

const initialState = {
  user: null,
  accessToken: null,
  profile: {},
  errors: { SignIn: null, SignUp: null, PasswordRecover: null }
}

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        errors: { SignIn: null }
      }
    case actions.AUTH_LOGIN_ERROR:
      return { ...state, errors: { SignIn: action.error } }
    case actions.AUTH_PASSWORD_RECOVER_ERROR:
      return { ...state, errors: { PasswordRecover: action.error } }
    case actions.AUTH_SIGNUP_SUCCESS:
      return { ...state, email: action.user, errors: { SignUp: null } }
    case actions.AUTH_SIGNUP_ERROR:
      return { ...state, errors: { SignUp: action.error } }
    case actions.AUTH_USER:
      return { ...state, user: action.user, accessToken: action.token }
    case actions.AUTH_LOGOUT:
      return initialState
    default:
      return state
  }
}
