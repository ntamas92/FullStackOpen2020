import axios from "axios"
const baseUrl = "/api/users"

const getAll = async (credentials) => {
  const response = await axios.get(baseUrl, getAuthorizationHeader(credentials))
  return response.data
}

const getAuthorizationHeader = (credentials) => {
  const token = `bearer ${credentials}`
  const config = {
    headers: { Authorization: token },
  }

  return config
}

export default { getAll }