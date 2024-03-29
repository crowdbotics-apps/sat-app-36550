import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const accounts_api_v1_password_change_create = createAsyncThunk(
  "passwordChanges/accounts_api_v1_password_change_create",
  async payload => {
    const response = await apiService.accounts_api_v1_password_change_create(
      payload
    )
    return response.data
  }
)
export const rest_auth_password_change_create = createAsyncThunk(
  "passwordChanges/rest_auth_password_change_create",
  async payload => {
    const response = await apiService.rest_auth_password_change_create(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const passwordChangesSlice = createSlice({
  name: "passwordChanges",
  initialState,
  reducers: {},
  extraReducers: {
    [accounts_api_v1_password_change_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [accounts_api_v1_password_change_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [accounts_api_v1_password_change_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [rest_auth_password_change_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [rest_auth_password_change_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [rest_auth_password_change_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  accounts_api_v1_password_change_create,
  rest_auth_password_change_create,
  slice: passwordChangesSlice
}
