/** @format */

import { User } from "../types.d";
import { apiRequest, apiRequestWithToken } from "./apiRequest";
const userUrl = "users";
const authUrl = "auth";

const getLoggedInUser = async () => {
  const res = await apiRequestWithToken(authUrl, "get");
  return res.data;
};

const getAllUsers = async () => {
  const res = await apiRequest(userUrl, "get");
  return res.data;
};

const createUser = async (newUser: User) => {
  const res = await apiRequest(userUrl, "post", newUser);
  return res.data;
};

export default { getAllUsers, createUser, getLoggedInUser };
