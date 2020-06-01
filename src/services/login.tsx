/** @format */

import { apiRequest } from "./apiRequest";
import { setUser } from "./tokenService";
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
    const res = await apiRequest(loginUrl, "post", loginCredentials);
    const user: AuthenticatedUser = res.data;
    setUser(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export default { login };
