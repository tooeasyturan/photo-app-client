/** @format */

import axios from "axios";
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
): Promise<AuthenticatedUser | undefined> => {
  try {
    const authUser = await axios.post(baseUrl, loginCredentials);
    window.localStorage.setItem("loggedInUser", JSON.stringify(authUser.data));
    return authUser.data;
  } catch (error) {
    console.log(error);
  }
};

export default { login };
