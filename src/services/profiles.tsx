/** @format */

import { Upload, UserProfile } from "../types.d";
import { apiRequest, apiRequestWithToken } from "./apiRequest";
const profileUrl = "users/profile";

interface FullUserProfile {
  avatar: string;
  firstName: string;
  lastName: string;
  username: string;
  date: string;
  profile: UserProfile;
  upload: Upload;
}

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
