import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

const createStore = reducer => reduxCreateStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default createStore
