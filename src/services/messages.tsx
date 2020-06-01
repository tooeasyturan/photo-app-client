/** @format */

import { apiRequestWithToken } from "./apiRequest";
const messagesUrl = "messages";

interface NewMessage {
  userFrom: string;
  userTo: string;
  message: string;
}

interface Conversation {
  convoId: string;
  id: string;
  message: {
    content: string;
    date: string;
    sender: string;
    _id: string;
  };
}

interface AllMessages {
  deleteByReceiver: string | null;
  deletebySender: string | null;
  id: string;
  members: string[];
  receiver: string;
  sendeer: string;
}

const createMessage = async (newMessage: NewMessage) => {
  const res = await apiRequestWithToken(messagesUrl, "post", newMessage);
  return res.data;
};

const getAllMessages = async (): Promise<AllMessages> => {
  const res = await apiRequestWithToken(messagesUrl, "get");
  console.log("get all messages", res.data);
  return res.data;
};

const getConversation = async (
  conversationId: string
): Promise<Conversation> => {
  const res = await apiRequestWithToken(
    `${messagesUrl}/${conversationId}`,
    "get"
  );
  console.log("get conversation", res.data);
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
