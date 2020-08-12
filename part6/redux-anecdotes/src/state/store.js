import { createStore as reduxCreateStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

const createStore = reducer => reduxCreateStore(reducer, composeWithDevTools())

export default createStore
