/** @format */

import axios from "axios";
import usersService from "./users";
const baseUrl = "http://localhost:3004/login";

interface AuthenticatedUser {
  id: string;
  token: string;
  username: string;
  status: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

const login = async (
  loginCredentials: LoginCredentials
): Promise<AuthenticatedUser> => {
  const authUser = await axios.post(baseUrl, loginCredentials);
  console.log("authUser data", authUser.data);
  window.localStorage.setItem("loggedInUser", JSON.stringify(authUser.data));
  usersService.setToken(authUser.data.token);
  return authUser.data;
};

export default { login };
