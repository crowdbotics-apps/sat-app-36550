import React, { useEffect } from "react"
import { Provider } from "react-redux"
import "react-native-gesture-handler"

import Navigation from "./Navigation"
import { store } from "./redux/store"
import { setupHttpConfig } from "./utils/http"
import { AppContext } from "./context"
import { StatusBar } from "react-native"

const initialState = {
  // initial state
}

const App = () => {
  useEffect(() => {
    setupHttpConfig()
  }, [])

  return (
    <AppContext.Provider value={initialState}>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </AppContext.Provider>
  )
}

export default App
