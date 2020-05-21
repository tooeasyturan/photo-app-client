import axios from "axios";
const baseUrl = "http://localhost:3004/profile";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (credentials, newObject) => {
  const config = {
    headers: { Authorization: `bearer ${credentials.token}` },
  };
  const response = await axios.post(baseUrl, newObject, config);
  console.log("response", response);
  return response.data;
};

const getProfile = async (username) => {
  console.log("username", username);
  const req = await axios.get(`http://localhost:3004/users/${username}`);
  return req.data[0];
};

export default { create, setToken, getProfile };
