import { userActionTypes } from "./userReducer"

const setUser = (user) => async dispatch => {
  dispatch({ type: userActionTypes.SET_USER, data: user })
}

export default { setUser }