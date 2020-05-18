/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import messagesService from "../../services/messages";
import { UserContext } from "../UserContext";
import { flatten, zipObject } from "lodash";
import DisplayMessage from "./DisplayMessages";
import MessageAppView from "./MessageAppView";
import useImageHandling from "../custom-hooks/useImageHandling";

// This component is probably too large and confusing with shitty variable names

const GetAllMessages = () => {
  const [userFrom, setUserFrom] = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [cleanConvos, setCleanConvos] = useState([]);
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [response, setResponse] = useState("");

  const { fetchAvatar, avatar } = useImageHandling();

  useEffect(() => {
    getUserMessages();
  }, []);

  const getUserMessages = async () => {
    try {
      // Fetch all conversations for logged in user
      let result = await messagesService.getAll();
      result = result.filter(
        (message) =>
          message.deleteBySender !== userFrom.username &&
          message.deleteByReceiver !== userFrom.username
      );
      setCleanConvos(cleanData(result));
    } catch (exception) {
      console.log(exception);
    }
  };

  const cleanData = (rawConvos) => {
    // This function "cleans" the data and returns an object with the userTo name and corresponding conversationID for each conversation. ex {emil: "5eb9499e9f2581ac9e791cc7", jon: "5ebfefd38756654cfd41f4a6"}

    let convos = rawConvos.map((convo) => convo.members);
    // Returns an array of size 2 arrays consisting of the members of each conversation.
    // ex. [['emil', 'josh'], ['josh','jon'],...[loggedInUser, userTo]]

    let users = flatten(convos).filter((name) => name !== userFrom.username);
    setUsers(users);
    // Returns an array of strings consisting of all the other users the logged in user has an existing conversation object with. ex ['emil', 'jon'] ....where 'josh' is the logged in user

    let ids = rawConvos.map((convo) => convo.id);
    // Returns the conversation ID for each conversation

    return zipObject(users, ids);
    // Creates an object with key: userTo.username, value: conversation ID
  };

  window.cleanConvos = cleanConvos;

  const handleFetchMessages = async (e) => {
    // Fetch messages between logged in user and user that is selected onClick
    setUserSelected(e.target.innerHTML);
    fetchAvatar(e.target.innerHTML);
    const result = await messagesService.getConvo(e.target.id);
    setFetchedMessages(result[0].message);
  };

  const messagesToDisplay = () =>
    fetchedMessages.map((message) => (
      <DisplayMessage
        key={message._id}
        message={message}
        userFrom={userFrom}
        userToAvatar={avatar}
      />
    ));

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("onSubmit", userSelected);
    try {
      await messagesService.create({
        userFrom: userFrom.id,
        userTo: userSelected,
        message: response,
      });
      let newMessage = {
        sender: userFrom.username,
        content: response,
        date: new Date().toLocaleString(),
      };
      setFetchedMessages([...fetchedMessages, { ...newMessage }]);
      setResponse("");
    } catch (exception) {
      console.log(exception);
    }
  };

  window.cleanConvos = cleanConvos;

  const handleRemoveConvo = async (e, user) => {
    console.log(e.target.id);
    console.log(user);
    console.log(users);
    console.log(cleanConvos);

    let updatedConvos = users.filter((updated) => updated !== user);
    console.log(updatedConvos);
    setUsers(updatedConvos);

    try {
      const result = await messagesService.removeConvo(e.target.id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  window.users = users;

  return (
    <MessageAppView
      users={users}
      cleanConvos={cleanConvos}
      handleFetchMessages={handleFetchMessages}
      handleRemoveConvo={handleRemoveConvo}
      fetchedMessages={fetchedMessages}
      messagesToDisplay={messagesToDisplay}
      handleSubmit={handleSubmit}
      response={response}
      setResponse={setResponse}
    />
  );
};

export default GetAllMessages;
