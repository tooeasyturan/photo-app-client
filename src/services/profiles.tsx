/** @format */

import axios from "axios";
import { MyProfile, UserProfile, Upload } from "../types.d";
const baseUrl = "http://localhost:3004/users/profile";

interface FullUserProfile {
  avatar: string;
  firstName: string;
  lastName: string;
  username: string;
  date: string;
  profile: UserProfile;
  upload: Upload;
}

const create = async (
  authToken: string,
  newObject: MyProfile
): Promise<string | undefined> => {
  const config = {
    headers: { Authorization: `bearer ${authToken}` },
  };
  try {
    const res = await axios.post(baseUrl, newObject, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (
  username: string
): Promise<FullUserProfile | undefined> => {
  try {
    const res = await axios.get(`http://localhost:3004/users/${username}`);
    return res.data[0];
  } catch (error) {
    console.log(error);
  }
};

export default { create, getProfile };
