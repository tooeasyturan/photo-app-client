import axios from "axios";
const baseUrl = "http://localhost:3004/uploads";

const getImages = (param) => {
  const req = axios.get(`http://localhost:3004/${param}`);
  return req.then((res) => res.data);
};

const uploadImage = async (formData, userToken) => {
  const config = {
    headers: { Authorization: `bearer ${userToken}` },
  };
  const res = await axios.post(baseUrl, formData, config);
  return res.data;
};

const uploadAvatar = async (formData, userToken) => {
  const config = {
    headers: { Authorization: `bearer ${userToken}` },
  };
  const res = await axios.post(`${baseUrl}/avatar`, formData, config);
  return res.data;
};

const deletePortfolioPicture = async (userToken, imageToDelete) => {
  console.log("token", userToken);
  const config = {
    "Content-Type": "application/json",
    headers: { Authorization: `bearer ${userToken}` },
    data: { imageToDelete },
  };
  const res = await axios.delete(baseUrl, config);
  return res.data;
};

export default {
  getImages,
  uploadImage,
  deletePortfolioPicture,
  uploadAvatar,
};
