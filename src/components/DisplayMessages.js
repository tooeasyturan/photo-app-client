import React, { useState, useEffect, useContext } from 'react'
import { Button, Modal, Form, Header, TextArea, Grid, Image, Comment } from 'semantic-ui-react'
import '../styles/Messages.css'
import ConvoAvatar from './ConvoAvatar'





const DisplayMessages = ({ message, userToAvatar, userFrom }) => {


  return (
    <>
      {/* <Comment>
        {userFrom.username === message.sender ? <Comment.Avatar avatar /> : <Comment.Avatar as='a' src={userToAvatar} />}
        <Comment.Content>
          <Comment.Author>{message.sender}</Comment.Author>
          <Comment.Metadata>{message.date}</Comment.Metadata>
          <Comment.Text>
            <p>{message.content}</p>
          </Comment.Text>
       </Comment.Content> 
      </Comment> */}

      {userFrom.username !== message.sender ?
        <Comment>
          <Comment.Avatar as='a' src={userToAvatar} />
          <Comment.Content>
            <Comment.Author>{message.sender}</Comment.Author>
            <Comment.Metadata>{message.date}</Comment.Metadata>
            <Comment.Text>
              <p>{message.content}</p>
            </Comment.Text>
          </Comment.Content>
        </Comment>
        : <Comment >
          <Comment.Content>
            <Comment.Author className='loggedInUser'>You</Comment.Author>
            <Comment.Metadata style={{ display: 'flex', flexDirection: 'row-reverse', paddingRight: 10 }}>{message.date}</Comment.Metadata>
            <Comment.Text className='loggedInUser'>
              <p>{message.content}</p>
            </Comment.Text>
          </Comment.Content>
        </Comment>}




    </>

    // <div>
    //   <h3 style={{ fontWeight: 'bold' }}>{message.sender}</h3>
    //   <h3>{message.content}</h3>
    // </div>

  )
}

export default DisplayMessages