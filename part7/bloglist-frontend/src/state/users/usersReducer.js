const initialState = []

export const usersActionTypes = {
  SET_USERS: "SET_USERS"
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case usersActionTypes.SET_USERS:
      return action.data
    default:
      return state
  }

}

export default userReducer