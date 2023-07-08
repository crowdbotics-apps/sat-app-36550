import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const accounts_api_v1_profile_read = createAsyncThunk(
  "authAccountProfiles/accounts_api_v1_profile_read",
  async payload => {
    const response = await apiService.accounts_api_v1_profile_read(payload)
    return response.data
  }
)
export const accounts_api_v1_profile_update = createAsyncThunk(
  "authAccountProfiles/accounts_api_v1_profile_update",
  async payload => {
    const response = await apiService.accounts_api_v1_profile_update(payload)
    return response.data
  }
)
export const accounts_api_v1_profile_partial_update = createAsyncThunk(
  "authAccountProfiles/accounts_api_v1_profile_partial_update",
  async payload => {
    const response = await apiService.accounts_api_v1_profile_partial_update(
      payload
    )
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const authAccountProfilesSlice = createSlice({
  name: "authAccountProfiles",
  initialState,
  reducers: {},
  extraReducers: {
    [accounts_api_v1_profile_read.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [accounts_api_v1_profile_read.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [accounts_api_v1_profile_read.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [accounts_api_v1_profile_update.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [accounts_api_v1_profile_update.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
        state.api.loading = "idle"
      }
    },
    [accounts_api_v1_profile_update.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [accounts_api_v1_profile_partial_update.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [accounts_api_v1_profile_partial_update.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
        state.api.loading = "idle"
      }
    },
    [accounts_api_v1_profile_partial_update.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  accounts_api_v1_profile_read,
  accounts_api_v1_profile_update,
  accounts_api_v1_profile_partial_update,
  slice: authAccountProfilesSlice
}
