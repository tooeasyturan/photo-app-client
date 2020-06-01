/** @format */

import { apiRequest, apiRequestWithToken } from "./apiRequest";
import { FullUserProfile } from "../types.d";
const profileUrl = "users/profile";

const createProfile = async (
  profileFields: FullUserProfile
): Promise<string | undefined> => {
  const res = await apiRequestWithToken(profileUrl, "post", profileFields);
  return res.data;
};

const getProfile = async (username: string) => {
  // Need to update endpoints
  const res = await apiRequest(`users/${username}`, "get");
  return res.data[0];
};

export default { createProfile, getProfile };
