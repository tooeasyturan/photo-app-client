import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import messagesService from '../services/messages'
import { Button, Modal, Form, Header, TextArea, Grid, Image, Comment, Container, List, Segment, Icon, Loader } from 'semantic-ui-react'
import { UserContext } from './UserContext'
import { flatten, filter, map, zipObject, keyBy } from 'lodash'
import SendMessageBtn from './SendMessageBtn'
import DisplayMessage from './DisplayMessages'

import ConvoAvatar from './ConvoAvatar'



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
      let result = await messagesService.getAll()
      console.log('result!', result)
      result = result.filter(message =>
        message.deleteBySender !== loggedInUser.username && message.deleteByReceiver !== loggedInUser.username)
      setRawConvos(result)
      setCleanConvos(cleanData(result))

      // setIsLoading(true)


    } catch (exception) {
      console.log(exception)
    }
  }

  window.rawConvos = rawConvos


  const cleanData = (rawConvos) => {
    console.log('raw con')
    let convos = rawConvos.map(convo => convo.members)
    let users = flatten(convos).filter(name => name !== loggedInUser.username)
    setUsers(users)
    console.log('users set', users)
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
    setUserToAvatar(result.data[0])
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
      userToAvatar={userToAvatar}
    />
  )



  // const convoAvatar = (avatar) => {
  //   return <Image avatar src={avatar}></Image>
  // }

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

  const handleRemoveConvo = async (e, user) => {
    console.log(e.target.id)
    console.log(user)
    console.log(users)
    console.log(cleanConvos)

    // 'updated' refers to updated users list without user that has been selected to be
    let updatedConvos = users.filter(updated => updated !== user)
    console.log(updatedConvos)
    setUsers(updatedConvos)

    try {
      const result = await messagesService.removeConvo(e.target.id)

      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }



  window.users = users


  return (
    <div style={{ marginTop: 75, width: '100%' }}>
      <Container style={{ width: '70%', height: 600 }}>
        <Segment style={{ height: 600 }}>
          {/* <Segment style={{ width: '50%' }}> */}
          <Header as='h1' style={{ textAlign: 'center' }}>Inbox</Header>
          <Grid>
            <Grid.Column width={5}>
              <List selection verticalAlign='middle'>
                {users && cleanConvos ? users.map(user =>
                  <List.Item style={{}} >
                    {/* {isLoading ? <Loader active inline /> : <Image avatar src={userToAvatar[0]} />} */}
                    <ConvoAvatar user={user} />
                    <List.Content verticalAlign='middle' style={{ paddingTop: 5 }}>
                      <List.Header as='h4' onClick={handleFetchMessages} id={cleanConvos[user]} key={cleanConvos[user]}>
                        {user}
                      </List.Header>
                    </List.Content>
                    {/* <List.Content> */}
                    <Button floated='right' icon='trash alternate outline' size='medium'
                      id={cleanConvos[user]}
                      onClick={(e) => handleRemoveConvo(e, user)}
                    >
                    </Button>
                    {/* </List.Content> */}
                  </List.Item>
                ) : <h1>Loading</h1>}
              </List>
            </Grid.Column>
            <Grid.Column width={10} style={{ height: 400 }}>
              <Comment.Group style={{
                height: '100%', overflow: 'auto', border: '2px solid black', background: 'ghostwhite',
                borderRadius: '5px'
              }}>
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
        </Segment>
      </Container>
    </div>
  )
}

export default GetAllMessages


