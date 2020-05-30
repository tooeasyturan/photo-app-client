/** @format */

import axios from "axios";
const baseUrl = "http://localhost:3004/uploads";

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

const uploadImage = async (formData: {}): Promise<string | undefined> => {
  try {
    const res = await axios.post(baseUrl, formData, config);
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
};

const uploadAvatar = async (formData: {}): Promise<string | undefined> => {
  try {
    const res = await axios.post(`${baseUrl}/avatar`, formData, config);
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
};

const deletePortfolioPicture = async (imageToDelete: string) => {
  let configWithData = {
    ...config,
    data: { imageToDelete },
  };
  try {
    const res = await axios.delete(baseUrl, configWithData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getImages,
  uploadImage,
  deletePortfolioPicture,
  uploadAvatar,
};
