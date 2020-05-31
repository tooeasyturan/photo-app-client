/** @format */

import axios from "axios";
import usersService from "./users";
import { apiRequest, apiRequestWithToken } from "./apiRequest";
import { SetUser } from "./tokenService";
const loginUrl = "login";

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
    const response = await apiRequest(loginUrl, "post", loginCredentials);
    const user: AuthenticatedUser = response.data;
    SetUser(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export default { login };
