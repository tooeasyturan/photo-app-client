import React, { useState, useEffect, useContext } from 'react'
import messagesService from '../services/messages'
import { Button, Modal, Form, Header, TextArea } from 'semantic-ui-react'
import { UserContext } from './UserContext'



const SendMessage = ({ userTo }) => {
  const [saved, setSaved] = useState(false)
  const [message, setMessage] = useState('')

  // fetchedUser is currently logged in user
  const [userFrom, setUserFrom] = useContext(UserContext)


  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedTFPappUser'))
  messagesService.setToken(loggedInUser.token)


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await messagesService.create({ userFrom: userFrom.id, userTo: userTo.id, message: message })
      console.log('send message', result)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <>
      <Modal style={{ marginTop: 100 }} as={Form} onSubmit={handleSubmit} size='tiny' trigger={<Button>Message User</Button>}>
        <Header icon="pencil" content={`Message ${userTo.username}`} as="h2" />
        <Modal.Content>
          <Form.Field
            control={TextArea}
            value={message}
            onChange={handleChange}
            placeholder='Tell us more about yourself...'
          />
          {saved ? <div>Saved!</div> : null}
        </Modal.Content>
        <Modal.Actions>
          <Button type="submit" color="red" icon="times" content="Close" />
          <Button type="submit" color="green" icon="save" content="Save" />
        </Modal.Actions>
      </Modal>


    </>
  )
}

export default SendMessage