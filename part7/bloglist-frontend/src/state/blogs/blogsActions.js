import { blogActionTypes } from "./blogsReducer"
import blogService from "../../services/blogs";

const initializeBlogs = () => async (dispatch, getState) => {
  const blogs = await blogService.getAll(extractUserToken(getState))

  dispatch({ type: blogActionTypes.SET_BLOGS, data: blogs })
}

const addBlog = blog => async (dispatch, getState) => {
  const result = await blogService.addNewBlog(blog, extractUserToken(getState));

  dispatch({ type: blogActionTypes.ADD_BLOG, data: result })
}

const removeBlog = blog => async (dispatch, getState) => {
  await blogService.removeBlog(blog, extractUserToken(getState));

  dispatch({ type: blogActionTypes.REMOVE_BLOG, data: { id: blog.id } })
}

const incrementLikesOnBlog = blog => async (dispatch, getState) => {
  const updatedBlog = await blogService.incrementLikes(blog, extractUserToken(getState));
  dispatch({ type: blogActionTypes.MODIFY_BLOG, data: updatedBlog })
}

const extractUserToken = (getState) => {
  const user = getState().user
  return user.token
}

export default { initializeBlogs, addBlog, removeBlog, incrementLikesOnBlog }