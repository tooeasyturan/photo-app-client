/** @format */

import axios from "axios";
import { apiRequestWithToken } from "./apiRequest";
const baseUrl = "http://localhost:3004/messages";
const messagesUrl = "messages";

const loggedInUser = window.localStorage.getItem("loggedInUser")
  ? JSON.parse(window.localStorage.getItem("loggedInUser"))
  : null;
let token = loggedInUser ? `bearer ${loggedInUser.token}` : null;
const config = {
  headers: { Authorization: token },
};

const createMessage = async (newMessage: {}) => {
  const res = await apiRequestWithToken(messagesUrl, "post", newMessage);
  return res.data;
};

const getAllMessages = async () => {
  const res = await apiRequestWithToken(messagesUrl, "get");
  return res.data;
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

export default { getConvo, removeConvo, createMessage, getAllMessages };
