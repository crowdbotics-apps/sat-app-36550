import { combineReducers } from "redux"

/**
 * you can import more reducers here
 */
import { AuthReducer } from "./auth/reducers"
import { AppReducer } from "./app/reducers"

export const combinedReducers = combineReducers({
  Auth: AuthReducer,
  App: AppReducer
})
