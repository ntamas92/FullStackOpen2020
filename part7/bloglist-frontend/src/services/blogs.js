import axios from "axios"
const baseUrl = "/api/blogs"

const getAll = async (credentials) => handleException(async () => {
  const response = await axios.get(baseUrl, getAuthorizationHeader(credentials))
  return response.data
})

const addNewBlog = async (newBlog, credentials) => handleException(async () => {
  const response = await axios.post(baseUrl, newBlog, getAuthorizationHeader(credentials))
  return response.data
})

const incrementLikes = async (blog, credentials) => handleException(async () => {
  const response = await axios.put(baseUrl + "/" + blog.id, { ...blog, likes: blog.likes + 1 }, getAuthorizationHeader(credentials))
  return response.data
})

const addComment = async (blog, comment, credentials) => handleException(async () => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, comment, getAuthorizationHeader(credentials))
  return response.data
})

const removeBlog = async (blog, credentials) => handleException(async () => {
  const response = await axios.delete(baseUrl + "/" + blog.id, getAuthorizationHeader(credentials))
  return response.data
})

const getAuthorizationHeader = (credentials) => {
  const token = `bearer ${credentials}`
  const config = {
    headers: { Authorization: token },
  }

  return config
}

const handleException = async action => {
  // try {
    return await action()
  // } catch (exception) {
  //   console.log(exception)
  // }
}

export default { getAll, addNewBlog, removeBlog, incrementLikes, addComment }