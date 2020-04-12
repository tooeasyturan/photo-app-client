import React, { useState, useEffect, useContext } from 'react'
import messagesService from '../services/messages'
import { UserContext } from './UserContext'
import { Button, Form, TextArea } from 'semantic-ui-react'

const SendMessageBtn = ({ userSelected, response }) => {
  const [userFrom, setUserFrom] = useContext(UserContext)

  return (
    <div>

    </div>
  )
}

export default SendMessageBtn