/** @format */

import axios from "axios";
import { MyProfile, UserProfile, Upload } from "../types.d";
const baseUrl = "http://localhost:3004/users/profile";

const loggedInUser = window.localStorage.getItem("loggedInUser")
  ? JSON.parse(window.localStorage.getItem("loggedInUser"))
  : null;
let token = loggedInUser ? `bearer ${loggedInUser.token}` : null;
let config = {
  headers: { Authorization: token },
};

interface FullUserProfile {
  avatar: string;
  firstName: string;
  lastName: string;
  username: string;
  date: string;
  profile: UserProfile;
  upload: Upload;
}

const create = async (newObject: MyProfile): Promise<string | undefined> => {
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
    const res = await axios.get(`${baseUrl}/${username}`);
    return res.data[0];
  } catch (error) {
    console.log(error);
  }
};

export default { create, getProfile };
