import React from "react";
import { Comment } from "semantic-ui-react";
import "../../styles/Messages.css";

// Displays messages from parent GetAllMessages. Does not display list of convos. This is done in GetAllMessages for now.
// Need to fix so that message (comment) avatars are displayed first time convo is opened. Currently requires double click.

const DisplayMessages = ({ message, userToAvatar, userFrom }) => {
  return (
    <>
      {userFrom.username !== message.sender ? (
        <Comment>
          <Comment.Avatar as="a" src={userToAvatar} />
          <Comment.Content>
            <Comment.Author href={`/users/${message.sender}`}>
              {message.sender}
            </Comment.Author>
            <Comment.Metadata>{message.date}</Comment.Metadata>
            <Comment.Text>
              <p>{message.content}</p>
            </Comment.Text>
          </Comment.Content>
        </Comment>
      ) : (
        <Comment>
          <Comment.Content>
            <Comment.Author className="loggedInUser">You</Comment.Author>
            <Comment.Metadata
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                paddingRight: 10,
              }}
            >
              {message.date}
            </Comment.Metadata>
            <Comment.Text className="loggedInUser">
              <p>{message.content}</p>
            </Comment.Text>
          </Comment.Content>
        </Comment>
      )}
    </>
  );
};

export default DisplayMessages;
