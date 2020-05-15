import axios from "axios";

const baseUrl = "http://localhost:3004/uploads";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getUploads = () => {
  const username = JSON.parse(window.localStorage.getItem("loggedTFPappUser"))
    .username;
  const request = axios.get(`http://localhost:3004/${username}`, {
    params: { username: username },
  });
  return request.then((response) => response.data);
};

const getPortfolioPictures = (param) => {
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

const getAvatar = () => {
  const username = JSON.parse(window.localStorage.getItem("loggedTFPappUser"))
    .username;
  const request = axios.get(`http://localhost:3004/avatar/${username}`, {
    params: { username: username },
  });
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post(
    "http://localhost:3004/",
    newObject,
    config
  );
  return response.data;
};

export default {
  getUploads,
  getAvatar,
  create,
  setToken,
  getPortfolioPictures,
  uploadImage,
  deletePortfolioPicture,
  uploadAvatar,
};
