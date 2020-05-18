import axios from "axios";
const baseUrl = "http://localhost:3004/users";
const authUrl = "http://localhost:3004/auth";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const auth = async (credentials) => {
  const config = {
    headers: { Authorization: `bearer ${credentials.token}` },
  };
  const response = await axios.get(authUrl, config);
  return response.data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  try {
    // const config = {
    //   headers: { 'Content-Type': 'application/json' }
    // }
    const response = await axios.post(baseUrl, newObject);
    // console.log('RESPONSE', response)
    return response.data;
  } catch (error) {
    console.log(error.response.data.errors);
  }
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const createUser = async (newUser) => {
  try {
    const res = await axios.post(baseUrl, newUser);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default { setToken, getAll, create, update, auth, createUser };
