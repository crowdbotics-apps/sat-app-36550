import axios from "axios"

// const APP_PLATFORM = 'Mobile';
export const BASE_URL = "https://sat-app-36550.botics.co"
// export const BASE_URL = "http://127.0.0.1:8000"

export const request = axios.create({
  // headers: {
  //   // app_platform: APP_PLATFORM,
  //   app_version: 1,
  // },
})

export function setupHttpConfig() {
  request.defaults.baseURL = BASE_URL
  request.defaults.timeout = 25000
  axios.defaults.headers["Content-Type"] = "application/json"
  // you can add more default values for http requests here
}

export function addTokenToHttp(token) {
  return new Promise(resolve => {
    // do something asynchronous which eventually calls either:
    if (token) {
      request.defaults.headers.Authorization = `Token ${token}`
      resolve()
    } else {
      request.defaults.headers.Authorization = ""
      resolve()
    }
  })
}
