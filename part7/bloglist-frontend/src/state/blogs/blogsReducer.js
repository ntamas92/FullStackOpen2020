const initialState = []

export const blogActionTypes = {
  SET_BLOGS: "SET_BLOGS",
  ADD_BLOG: "ADD_BLOG",
  REMOVE_BLOG: "REMOVE_BLOG",
  MODIFY_BLOG: "MODIFY_BLOG"
}

const blogsReducer = (state = initialState, action) => {
  console.log("blogs action", action)

  if(action.type === blogActionTypes.SET_BLOGS)
    return action.data
  else if(action.type === blogActionTypes.ADD_BLOG)
    return state.concat(action.data)
  else if(action.type === blogActionTypes.REMOVE_BLOG)
    return state.filter(x => x.id !== action.data.id)
  else if(action.type === blogActionTypes.MODIFY_BLOG)
    return state.map(x => x.id === action.data.id ? action.data : x)

  return state
}

export default blogsReducer