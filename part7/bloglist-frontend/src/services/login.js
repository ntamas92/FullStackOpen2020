import axios from "axios";
const baseUrl = "/api/login";

const login = async ({ username, password }) => {
  const response = await axios.post(baseUrl, { username, password });
  const credentials = response.data;

  return credentials;
};

export default { login };
