/**
 * /* eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useReducer } from "react";
import messagesService from "../../services/messages";
import { UserContext } from "../UserContext";
import { flatten, zipObject } from "lodash";
import DisplayMessage from "./DisplayMessages";
import MessageAppView from "./MessageAppView";
import useImageHandling from "../custom-hooks/useImageHandling";

// This component is probably too large and confusing with shitty variable names

const initialState = {
  users: [],
  conversations: [],
  messages: [],
  userSelected: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "clean-convos":
      return { ...state, conversations: action.payload };
    case "set-users":
      return { ...state, users: action.payload };
    case "user-selected":
      return { ...state, userSelected: action.payload };
    case "all-messages":
      return { ...state, messages: action.payload };
    case "new-message":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "remove-conversation":
      return { ...state, users: action.payload };
    default:
      return state;
  }
}

const GetAllMessagesReducer = () => {
  const { user, setUser } = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [response, setResponse] = useState("");
  const { fetchAvatar, avatar } = useImageHandling();

  useEffect(() => {
    getUserMessages();
  }, []);

  // Go through with mark on how to do this with user testing in typescript
  const getUserMessages = async () => {
    try {
      // Fetch all conversations for logged in user
      let result = await messagesService.getAllMessages();
      result = result.filter(
        (message) =>
          message.deleteBySender !== user.username &&
          message.deleteByReceiver !== user.username
      );
      dispatch({ type: "clean-convos", payload: cleanData(result) });
    } catch (exception) {
      console.log(exception);
    }
  };

  const cleanData = (rawConvos) => {
    // This function "cleans" the data and returns an object with the userTo name and corresponding conversationID for each conversation. ex {emil: "5eb9499e9f2581ac9e791cc7", jon: "5ebfefd38756654cfd41f4a6"}

    let convos = rawConvos.map((convo) => convo.members);
    // Returns an array of size 2 arrays consisting of the members of each conversation.
    // ex. [['emil', 'josh'], ['josh','jon'],...[loggedInUser, userTo]]

    let users = flatten(convos).filter((name) => name !== user.username);
    dispatch({ type: "set-users", payload: users });

    // setUsers(users);
    // Returns an array of strings consisting of all the other users the logged in user has an existing conversation object with. ex ['emil', 'jon'] ....where 'josh' is the logged in user

    let ids = rawConvos.map((convo) => convo.id);
    // Returns the conversation ID for each conversation

    return zipObject(users, ids);
    // Creates an object with key: userTo.username, value: conversation ID
  };

  const handleFetchMessages = async (e) => {
    // Fetch messages between logged in user and user that is selected onClick
    dispatch({ type: "user-selected", payload: e.target.innerHTML });

    fetchAvatar(e.target.innerHTML);
    const result = await messagesService.getConversation(e.target.id);
    dispatch({ type: "all-messages", payload: result[0].message });
  };

  const messagesToDisplay = () =>
    state.messages.map((message) => (
      <DisplayMessage
        key={message._id}
        message={message}
        userFrom={user}
        userToAvatar={avatar}
      />
    ));

  window.state = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("onSubmit", state.userSelected);
    try {
      await messagesService.createMessage({
        userFrom: user.id,
        userTo: state.userSelected,
        message: response,
      });
      let newMessage = {
        sender: user.username,
        content: response,
        date: new Date().toLocaleString(),
      };
      dispatch({ type: "new-message", payload: newMessage });
      setResponse("");
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleRemoveConvo = async (e, user) => {
    let updatedConvos = state.users.filter((updated) => updated !== user);
    dispatch({ type: "remove-conversation", payload: updatedConvos });

    try {
      const result = await messagesService.removeConversation(
        e.target.id,
        user.username
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MessageAppView
      users={state.users}
      conversations={state.conversations}
      handleFetchMessages={handleFetchMessages}
      handleRemoveConvo={handleRemoveConvo}
      messages={state.messages}
      messagesToDisplay={messagesToDisplay}
      handleSubmit={handleSubmit}
      response={response}
      setResponse={setResponse}
    />
  );
};

export default GetAllMessagesReducer;
