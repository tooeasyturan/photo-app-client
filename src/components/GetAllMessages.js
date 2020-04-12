import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import messagesService from '../services/messages'
import { Button, Modal, Form, Header, TextArea, Grid, Image, Comment, Container, List, Segment } from 'semantic-ui-react'
import { UserContext } from './UserContext'
import { flatten, filter, map, zipObject, keyBy } from 'lodash'
import SendMessageBtn from './SendMessageBtn'
import DisplayMessage from './DisplayMessages'



const GetAllMessages = () => {
  const [userFrom, setUserFrom] = useContext(UserContext)
  const [rawConvos, setRawConvos] = useState(null)
  const [users, setUsers] = useState([])
  const [cleanConvos, setCleanConvos] = useState([])
  // const [convos, setConvos] = useState([])
  const [fetchedMessages, setFetchedMessages] = useState([])
  const [userSelected, setUserSelected] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)

  const [response, setResponse] = useState('')

  const [userToAvatar, setUserToAvatar] = useState([])




  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedTFPappUser'))


  useEffect(() => {
    async function getUser() {
      await getUserMessages()
    }
    getUser()

  }, [])

  const getUserMessages = async () => {
    try {
      const result = await messagesService.getAll()
      setRawConvos(result)
      setCleanConvos(cleanData(result))
      // setIsLoading(true)


    } catch (exception) {
      console.log(exception)
    }
  }


  const cleanData = (rawConvos) => {
    let convos = rawConvos.map(convo => convo.members)
    let users = flatten(convos).filter(name => name !== loggedInUser.username)
    setUsers(users)
    let ids = rawConvos.map(convo => convo.id)
    let combined = zipObject(users, ids)

    return combined
  }


  const handleFetchMessages = async (e) => {
    setUserSelected(e.target.innerHTML)
    const result = await messagesService.getConvo(e.target.id)
    setFetchedMessages(result[0].message)
    if (userSelected) {
      fetchImages(userSelected)
    }
  }

  window.userToAvatar = userToAvatar
  window.userSelected = userSelected

  const fetchImages = async (userSelected) => {
    const result = await axios.get(`http://localhost:3004/uploads/${userSelected}/avatar`)
    setUserToAvatar(result.data)
    console.log('RESULT.DATA', result.data)
  }

  window.userSelected = userSelected
  window.userFrom = userFrom
  window.messages = fetchedMessages

  const messagesToDisplay = () => fetchedMessages.map(message =>
    <DisplayMessage
      key={message._id}
      message={message}
      userFrom={userFrom}
      userToAvatar={userToAvatar[0]}
    />
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('onSubmit', userSelected)
    try {
      await messagesService.create({ userFrom: userFrom.id, userTo: userSelected, message: response })
      let newMessage = {
        sender: userFrom.username,
        content: response,
        date: new Date().toLocaleString()
      }

      setFetchedMessages([...fetchedMessages, { ...newMessage }])
      setResponse('')
    } catch (exception) {
      console.log(exception)
    }
  }




  return (
    <div style={{ marginTop: 200, width: '100%' }}>
      <Container style={{ width: '70%', height: 600 }}>
        {/* <Segment style={{ width: '50%' }}> */}
        <Header as='h1'>Inbox</Header>
        <Grid>
          <Grid.Column width={5}>
            <List selection verticalAlign='middle'>
              {users && cleanConvos ? users.map(user =>
                <List.Item style={{ border: '1px solid black' }}>
                  <List.Content>
                    <List.Header onClick={handleFetchMessages} id={cleanConvos[user]} key={cleanConvos[user]}>{user}</List.Header>
                  </List.Content>
                </List.Item>
              ) : <h1>Loading</h1>}
            </List>
          </Grid.Column>
          <Grid.Column width={10} style={{ height: 400 }}>
            <Comment.Group style={{ height: '100%', overflow: 'auto', border: '1px solid black' }}>
              {fetchedMessages ? messagesToDisplay() : null}
            </Comment.Group>
            <Form reply onSubmit={handleSubmit}>
              <Form.TextArea
                control={TextArea}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder='Write a response'
              />
              <Button content='Send' labelPosition='left' icon='edit' type='submit' primary />
            </Form>
          </Grid.Column>

        </Grid>
        {/* </Segment> */}
      </Container>
    </div>
  )
}

export default GetAllMessages


