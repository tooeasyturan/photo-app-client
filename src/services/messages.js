/** @format */

import axios from "axios";
const baseUrl = "http://localhost:3004/messages";

const loggedInUser = window.localStorage.getItem("loggedInUser")
  ? JSON.parse(window.localStorage.getItem("loggedInUser"))
  : null;
let token = loggedInUser ? `bearer ${loggedInUser.token}` : null;
const config = {
  headers: { Authorization: token },
};

const create = async (newObject) => {
  try {
    const res = await axios.post(baseUrl, newObject, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getAll = async () => {
  try {
    const res = await axios.get(baseUrl, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getConvo = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/${id}`, config);
    return res.data;
  } catch (error) {}
};

const removeConvo = async (id) => {
  try {
    const res = await axios.post(
      `${baseUrl}/${id}`,
      loggedInUser.username,
      config
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default { create, getAll, getConvo, removeConvo };
