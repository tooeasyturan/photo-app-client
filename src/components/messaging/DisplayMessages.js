/** @format */

import React from "react";
import { Comment } from "semantic-ui-react";
import "../../styles/Messages.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const DisplayMessages = ({ message, userToAvatar, userFrom }) => {
  return (
    <>
      {userFrom.username !== message.sender ? (
        <Comment>
          <Comment.Avatar as='a' src={userToAvatar} />
          <Comment.Content>
            <Comment.Author as={Link} to={`/users/${message.sender}`}>
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
            <Comment.Author className='loggedInUser'>You</Comment.Author>
            <Comment.Metadata
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                paddingRight: 10,
              }}
            >
              {message.date}
            </Comment.Metadata>
            <Comment.Text className='loggedInUser'>
              <p>{message.content}</p>
            </Comment.Text>
          </Comment.Content>
        </Comment>
      )}
    </>
  );
};

export default DisplayMessages;
