import React, { useState, useEffect, useContext } from 'react'
import messagesService from '../services/messages'
import { Button, Modal, Form, Header, TextArea } from 'semantic-ui-react'
import { UserContext } from './UserContext'
import { flatten, filter, map, zipObject, keyBy } from 'lodash'

const GetAllMessages = () => {
  const [user, setUser] = useContext(UserContext)
  const [rawConvos, setRawConvos] = useState(null)
  const [users, setUsers] = useState([])
  const [cleanConvos, setCleanConvos] = useState([])
  // const [convos, setConvos] = useState([])

  const [isLoading, setIsLoading] = useState(false)


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

  console.log('clean convos', cleanConvos)
  window.cleanConvos = cleanConvos
  window.users = users
  window.rawConvos = rawConvos


  const cleanData = (rawConvos) => {
    let convos = rawConvos.map(convo => convo.members)
    let users = flatten(convos).filter(name => name !== 'Emil')
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


  const handleShowConvos = () => {
    console.log(cleanConvos)
    users.map(user =>
      console.log(
        <li id={cleanConvos[user]}>{user}</li>
      )
    )
  }

  const handleFetchMessages = async (e) => {
    console.log(e.target.id)
    const result = await messagesService.getConvo(e.target.id)
    console.log(result)
  }



  return (
    <div style={{ marginTop: 200 }}>
      <button onClick={handleClick}>Click</button>
      <button onClick={handleShowConvos}>Show convos</button>
      <button onClick={handleShowConvos}>Users</button>
      {/* <ul>
      {users && cleanConvos ? <h1>{users[1] + ' '}</h1> : <h1>Loading</h1>}
      </ul> */}
      <ul>
        {users && cleanConvos ? users.map(user =>
          <button onClick={handleFetchMessages} id={cleanConvos[user]}>{user}</button>
        ) : <h1>Loading</h1>}
      </ul>


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