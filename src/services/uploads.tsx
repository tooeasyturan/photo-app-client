/** @format */

import axios from "axios";
import { apiRequestWithToken } from "./apiRequest";
const uploadsUrl = "uploads";

const loggedInUser = window.localStorage.getItem("loggedInUser")
  ? JSON.parse(window.localStorage.getItem("loggedInUser"))
  : null;
let token = loggedInUser ? `bearer ${loggedInUser.token}` : null;
let config = {
  headers: { Authorization: token },
};

const getImages = async (param: string): Promise<string[] | undefined> => {
  try {
    const res = await axios.get(`http://localhost:3004/${param}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const uploadPicture = async (formData: {}): Promise<string | undefined> => {
  const res = await apiRequestWithToken(uploadsUrl, "post", formData);
  return res.data.url;
};

const uploadAvatar = async (formData: {}): Promise<string | undefined> => {
  const res = await apiRequestWithToken(
    `${uploadsUrl}/avatar`,
    "post",
    formData
  );
  return res.data.url;
};

const deletePortfolioPicture = async (imageToDelete: string) => {
  let configWithData = {
    "Content-Type": "application/json",
    ...config,
    data: { imageToDelete },
  };
  try {
    const res = await axios.delete(
      "http://localhost:3004/uploads",
      configWithData
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getImages,
  uploadPicture,
  deletePortfolioPicture,
  uploadAvatar,
};
