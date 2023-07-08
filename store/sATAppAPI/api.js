import axios from "axios"
const sATAppAPI = axios.create({
  baseURL: "https://sat-app-36550.botics.co",
  headers: { Accept: "application/json", "Content-Type": "application/json" }
})
function accounts_api_v1_login_token_create(payload) {
  return sATAppAPI.post(`/accounts/api/v1/login/token/`, payload.data)
}
function accounts_api_v1_password_reset_create(payload) {
  return sATAppAPI.post(`/accounts/api/v1/password-reset/`, payload.data)
}
function accounts_api_v1_password_reset_confirm_create(payload) {
  return sATAppAPI.post(
    `/accounts/api/v1/password-reset/confirm/`,
    payload.data
  )
}
function accounts_api_v1_password_change_create(payload) {
  return sATAppAPI.post(`/accounts/api/v1/password/change/`, payload.data)
}
function accounts_api_v1_profile_read(payload) {
  return sATAppAPI.get(`/accounts/api/v1/profile/`)
}
function accounts_api_v1_profile_update(payload) {
  return sATAppAPI.put(`/accounts/api/v1/profile/`, payload.data)
}
function accounts_api_v1_profile_partial_update(payload) {
  return sATAppAPI.patch(`/accounts/api/v1/profile/`, payload.data)
}
function accounts_api_v1_signup_create(payload) {
  return sATAppAPI.post(`/accounts/api/v1/signup/`, payload.data)
}
function accounts_api_v1_users_list(payload) {
  return sATAppAPI.get(`/accounts/api/v1/users/`)
}
function api_v1_login_create(payload) {
  return sATAppAPI.post(`/api/v1/login/`)
}
function api_v1_signup_create(payload) {
  return sATAppAPI.post(`/api/v1/signup/`, payload.data)
}
function documents_docusign_get_access_code_create(payload) {
  return sATAppAPI.post(`/documents/docusign/get-access-code/`)
}
function rest_auth_login_create(payload) {
  return sATAppAPI.post(`/rest-auth/login/`, payload.data)
}
function rest_auth_logout_list(payload) {
  return sATAppAPI.get(`/rest-auth/logout/`)
}
function rest_auth_logout_create(payload) {
  return sATAppAPI.post(`/rest-auth/logout/`)
}
function rest_auth_password_change_create(payload) {
  return sATAppAPI.post(`/rest-auth/password/change/`, payload.data)
}
function rest_auth_password_reset_create(payload) {
  return sATAppAPI.post(`/rest-auth/password/reset/`, payload.data)
}
function rest_auth_password_reset_confirm_create(payload) {
  return sATAppAPI.post(`/rest-auth/password/reset/confirm/`, payload.data)
}
function rest_auth_registration_create(payload) {
  return sATAppAPI.post(`/rest-auth/registration/`, payload.data)
}
function rest_auth_registration_verify_email_create(payload) {
  return sATAppAPI.post(`/rest-auth/registration/verify-email/`, payload.data)
}
function rest_auth_user_read(payload) {
  return sATAppAPI.get(`/rest-auth/user/`)
}
function rest_auth_user_update(payload) {
  return sATAppAPI.put(`/rest-auth/user/`, payload.data)
}
function rest_auth_user_partial_update(payload) {
  return sATAppAPI.patch(`/rest-auth/user/`, payload.data)
}
export const apiService = {
  accounts_api_v1_login_token_create,
  accounts_api_v1_password_reset_create,
  accounts_api_v1_password_reset_confirm_create,
  accounts_api_v1_password_change_create,
  accounts_api_v1_profile_read,
  accounts_api_v1_profile_update,
  accounts_api_v1_profile_partial_update,
  accounts_api_v1_signup_create,
  accounts_api_v1_users_list,
  api_v1_login_create,
  api_v1_signup_create,
  documents_docusign_get_access_code_create,
  rest_auth_login_create,
  rest_auth_logout_list,
  rest_auth_logout_create,
  rest_auth_password_change_create,
  rest_auth_password_reset_create,
  rest_auth_password_reset_confirm_create,
  rest_auth_registration_create,
  rest_auth_registration_verify_email_create,
  rest_auth_user_read,
  rest_auth_user_update,
  rest_auth_user_partial_update
}
