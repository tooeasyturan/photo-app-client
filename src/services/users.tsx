/** @format */

import { FullUserProfile, ShortProfiles, NewUser } from "../types.d";
import { apiRequest, apiRequestWithToken } from "./apiRequest";
const userUrl = "users";
const authUrl = "auth";

const getLoggedInUser = async (): Promise<FullUserProfile | undefined> => {
  const res = await apiRequestWithToken(authUrl, "get");
  return res.data;
};

const getAllUsers = async (): Promise<ShortProfiles[] | undefined> => {
  const res = await apiRequest(userUrl, "get");
  return res.data;
};

const createUser = async (newUser: NewUser): Promise<NewUser> => {
  const res = await apiRequest(userUrl, "post", newUser);
  return res.data;
};

export default { getAllUsers, createUser, getLoggedInUser };
