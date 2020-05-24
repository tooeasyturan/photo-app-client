/** @format */

import axios from "axios";
import usersService from "./users";
const baseUrl = "http://localhost:3004/login";

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials);
  console.log("res data", res.data);
  window.localStorage.setItem("loggedInUser", JSON.stringify(res.data));
  usersService.setToken(res.data.token);
  return res.data;
};

export default { login };
