/** @format */

import { apiRequestWithToken } from "./apiRequest";
const messagesUrl = "messages";

const createMessage = async (newMessage: {}) => {
  const res = await apiRequestWithToken(messagesUrl, "post", newMessage);
  return res.data;
};

const getAllMessages = async () => {
  const res = await apiRequestWithToken(messagesUrl, "get");
  return res.data;
};

const getConversation = async (conversationId: string) => {
  const res = await apiRequestWithToken(
    `${messagesUrl}/${conversationId}`,
    "get"
  );
  return res.data;
};

const removeConversation = async (conversationId: string, username: string) => {
  const res = await apiRequestWithToken(
    `${messagesUrl}/${conversationId}`,
    "post",
    username //why does this work? shouldn't data (username) be a string?
  );
  return res.data;
};

export default {
  createMessage,
  getAllMessages,
  getConversation,
  removeConversation,
};
