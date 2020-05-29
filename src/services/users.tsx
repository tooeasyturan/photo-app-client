/** @format */

import axios from "axios";
import { User } from "../types.d";
const baseUrl = "http://localhost:3004/users";
const authUrl = "http://localhost:3004/auth";

let token;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
  console.log("user token", newToken);
};

const auth = async (token: string) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  console.log("auth config", config);
  const res = await axios.get(authUrl, config);
  return res.data;
};

const getAll = async () => {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (newUser: User) => {
  try {
    const res = await axios.post(baseUrl, newUser);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default { setToken, getAll, auth, createUser };
