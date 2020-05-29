/** @format */

import axios from "axios";
const baseUrl = "http://localhost:3004/uploads";

const getImages = async (param: string): Promise<string[] | undefined> => {
  try {
    const res = await axios.get(`http://localhost:3004/${param}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const uploadImage = async (
  formData: {},
  userToken: string
): Promise<string | undefined> => {
  const config = {
    headers: { Authorization: `bearer ${userToken}` },
  };
  try {
    const res = await axios.post(baseUrl, formData, config);
    console.log("upload res", res.data);
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
};

const uploadAvatar = async (
  formData: {},
  userToken: string
): Promise<string | undefined> => {
  const config = {
    headers: { Authorization: `bearer ${userToken}` },
  };
  try {
    const res = await axios.post(`${baseUrl}/avatar`, formData, config);
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
};

const deletePortfolioPicture = async (
  userToken: string,
  imageToDelete: string
) => {
  console.log("token", userToken);
  const config = {
    "Content-Type": "application/json",
    headers: { Authorization: `bearer ${userToken}` },
    data: { imageToDelete },
  };
  try {
    const res = await axios.delete(baseUrl, config);
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
