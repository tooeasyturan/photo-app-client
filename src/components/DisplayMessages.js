import React, { useState, useEffect, useContext } from 'react'
import { Button, Modal, Form, Header, TextArea, Grid, Image, Comment } from 'semantic-ui-react'


const DisplayMessages = ({ message }) => {
  return (
    <>
      <Comment>
        <Comment.Content>
          <Comment.Author>{message.sender}</Comment.Author>
          <Comment.Metadata>{message.date}</Comment.Metadata>
          <Comment.Text>
            <p>{message.content}</p>
          </Comment.Text>
        </Comment.Content>
      </Comment>



    </>

    // <div>
    //   <h3 style={{ fontWeight: 'bold' }}>{message.sender}</h3>
    //   <h3>{message.content}</h3>
    // </div>

  )
}

export default DisplayMessages