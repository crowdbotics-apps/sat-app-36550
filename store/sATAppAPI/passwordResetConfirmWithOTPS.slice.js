import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const accounts_api_v1_password_reset_confirm_create = createAsyncThunk(
  "passwordResetConfirmWithOTPS/accounts_api_v1_password_reset_confirm_create",
  async payload => {
    const response = await apiService.accounts_api_v1_password_reset_confirm_create(
      payload
    )
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const passwordResetConfirmWithOTPSSlice = createSlice({
  name: "passwordResetConfirmWithOTPS",
  initialState,
  reducers: {},
  extraReducers: {
    [accounts_api_v1_password_reset_confirm_create.pending]: (
      state,
      action
    ) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [accounts_api_v1_password_reset_confirm_create.fulfilled]: (
      state,
      action
    ) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [accounts_api_v1_password_reset_confirm_create.rejected]: (
      state,
      action
    ) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  accounts_api_v1_password_reset_confirm_create,
  slice: passwordResetConfirmWithOTPSSlice
}
