/** @format */

import axios from "axios";
const baseUrl = "http://localhost:3004/users/profile";

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
  const res = await axios.get(`http://localhost:3004/users/${username}`);
  //Map through profile(s) here and return only data needed
  return res.data[0];
};

export default { create, setToken, getProfile };
