const initialState = []

export const blogActionTypes = {
  SET_BLOGS: "SET_BLOGS",
  ADD_BLOG: "ADD_BLOG",
  REMOVE_BLOG: "REMOVE_BLOG",
  MODIFY_BLOG: "MODIFY_BLOG"
}

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case blogActionTypes.SET_BLOGS:
      return action.data
    case blogActionTypes.ADD_BLOG:
      return state.concat(action.data)
    case blogActionTypes.REMOVE_BLOG:
      return state.filter(x => x.id !== action.data.id)
    case blogActionTypes.MODIFY_BLOG:
      return state.map(x => x.id === action.data.id ? action.data : x)
    default: return state
  }
}

export default blogsReducer