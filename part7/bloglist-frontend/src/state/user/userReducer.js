const initialState = null

export const userActionTypes = {
  SET_USER: "SET_USER"
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case userActionTypes.SET_USER:
      return action.data
    default:
      return state
  }

}

export default userReducer