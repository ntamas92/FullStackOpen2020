import { usersActionTypes } from "./usersReducer"
import userService from "../../services/users"

const initializeUsers = () => async (dispatch, getState) => {
  const users = await userService.getAll(extractUserToken(getState))

  dispatch({ type: usersActionTypes.SET_USERS, data: users })
}

const extractUserToken = (getState) => {
  const user = getState().user
  return user.token
}

export default { initializeUsers }