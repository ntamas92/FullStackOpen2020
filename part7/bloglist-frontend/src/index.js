import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import createStore from "./state/store"
import { Provider } from "react-redux"
import { combineReducers } from "redux"
import notificationReducer from "./state/notification/nofiticationReducer"
import blogsReducer from "./state/blogs/blogsReducer"
import userReducer from "./state/user/userReducer"

const combinedReducers = combineReducers({ notification: notificationReducer, blogs: blogsReducer, user:userReducer })

const store = createStore(combinedReducers)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"))
