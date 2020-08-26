import { blogActionTypes } from "./blogsReducer"

const setBlogs = (blogs) => async dispatch => {
  dispatch({ type: blogActionTypes.SET_BLOGS, data: blogs })
}

const addBlog = blog => async dispatch => {
  dispatch({ type: blogActionTypes.ADD_BLOG, data: blog })
}

const removeBlog = blog => async dispatch => {
  dispatch({ type: blogActionTypes.REMOVE_BLOG, data: { id: blog.id } })
}

const modifyBlog = blog => async dispatch => {
  dispatch({ type: blogActionTypes.MODIFY_BLOG, data: blog })
}

export default { setBlogs, addBlog, removeBlog, modifyBlog }