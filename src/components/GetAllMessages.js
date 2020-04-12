import React, { useState, useEffect, useContext } from 'react'
import messagesService from '../services/messages'
import { Button, Modal, Form, Header, TextArea, Grid, Image, Comment, Container, List, Segment } from 'semantic-ui-react'
import { UserContext } from './UserContext'
import { flatten, filter, map, zipObject, keyBy } from 'lodash'
import DisplayMessage from './DisplayMessages'



const GetAllMessages = () => {
  const [user, setUser] = useContext(UserContext)
  const [rawConvos, setRawConvos] = useState(null)
  const [users, setUsers] = useState([])
  const [cleanConvos, setCleanConvos] = useState([])
  // const [convos, setConvos] = useState([])
  const [fetchedMessages, setFetchedMessages] = useState([])
  const [userSelected, setUserSelected] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

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
      setUsers()
      setCleanConvos(cleanData(result))
      setIsLoading(true)


    } catch (exception) {
      console.log(exception)
    }
  }

  window.cleanConvos = cleanConvos
  window.users = users
  window.rawConvos = rawConvos
  window.fetchedMessages = fetchedMessages


  const cleanData = (rawConvos) => {
    let convos = rawConvos.map(convo => convo.members)
    let users = flatten(convos).filter(name => name !== loggedInUser.username)
    setUsers(users)
    let ids = rawConvos.map(convo => convo.id)
    let combined = zipObject(users, ids)

    return combined
  }

  const handleClick = async () => {
    let convos = rawConvos.map(convo => convo.members)
    window.convos = convos
    let users = flatten(convos).filter(name => name !== 'Emil')
    let ids = rawConvos.map(convo => convo.id)

    let usersTest = [{ 'users': users }]
    console.log('users test', usersTest)

    let idsTest = [{ 'ids': ids }]
    console.log('ids', idsTest)

    let combinedTest = zipObject(usersTest, ids)
    console.log('combined test', combinedTest)


    let combined = zipObject(users, ids)
    console.log(combined)


    // console.log('filtered', users)
    // console.log('ids', ids)

  }


  // const handleShowConvos = () => {
  //   console.log(cleanConvos)
  //   users.map(user =>
  //     console.log(
  //       <li id={cleanConvos[user]}>{user}</li>
  //     )
  //   )
  // }

  const handleFetchMessages = async (e) => {
    console.log(e.target.innerHTML)
    setUserSelected(e.target.innerHTML)
    const result = await messagesService.getConvo(e.target.id)
    setFetchedMessages(result[0].message)
  }

  console.log('messages', fetchedMessages)
  window.userSelected = userSelected


  const messagesToDisplay = () => fetchedMessages.map(message =>
    <DisplayMessage
      key={message._id}
      message={message}
    />
  )




  return (
    <div style={{ marginTop: 200, width: '100%' }}>
      {/* <div style={{ marginTop: 200 }}>
        <button onClick={handleClick}>Click</button> */}
      {/* <ul>
      {users && cleanConvos ? <h1>{users[1] + ' '}</h1> : <h1>Loading</h1>}
      </ul> */}
      {/* <ul>
          {users && cleanConvos ? users.map(user =>
            <button onClick={handleFetchMessages} id={cleanConvos[user]} key={cleanConvos[user]}>{user}</button>
          ) : <h1>Loading</h1>}
        </ul> */}
      {/* {fetchedMessages ? messagesToDisplay() : null} */}
      {/* </div> */}

      {/* <List selection verticalAlign='middle'>
        {users && cleanConvos ? users.map(user =>
          <List.Item >
            <List.Content>
              <List.Header onClick={handleFetchMessages} id={cleanConvos[user]} key={cleanConvos[user]}>{user}</List.Header>
            </List.Content>
          </List.Item>
        ) : <h1>Loading</h1>}
      </List> */}

      <div>
        <Segment style={{ width: '50%' }}>
          <Header as='h1'>Inbox</Header>
          <Grid>
            <Grid.Column width={5}>
              <List selection verticalAlign='middle'>
                {users && cleanConvos ? users.map(user =>
                  <List.Item >
                    <List.Content>
                      <List.Header onClick={handleFetchMessages} id={cleanConvos[user]} key={cleanConvos[user]}>{user}</List.Header>
                    </List.Content>
                  </List.Item>
                ) : <h1>Loading</h1>}
              </List>
            </Grid.Column>
            <Grid.Column width={10}>
              <Comment.Group>
                {fetchedMessages ? messagesToDisplay() : null}
                <Form reply>
                  <Form.TextArea />
                  <Button content='Send' labelPosition='left' icon='edit' primary onClick={() => console.log(userSelected)} />
                </Form>
              </Comment.Group>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>




    </div>


  )

}

export default GetAllMessages


    // const filteredResult = function (arr) {

    //   for (let i = 0; i < arr.length; i++) {
    //     let subArr = arr[i]
    //     // console.log(subArr)
    //     for (let j = 0; j < subArr.length; j++) {
    //       // console.log(subArr)
    //       let newArr = []

    //       if (subArr[j] !== 'Emil') {
    //         newArr.push(subArr[j])
    //         // subArr.splice(subArr[j], 1)
    //         // console.log(newArr)
    //       }
    //       return newArr
    //     }

    //   }


    // }