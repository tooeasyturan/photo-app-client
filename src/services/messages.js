import axios from 'axios'
const baseUrl = 'http://localhost:3004/messages'

let token = null
const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = async () => {
  setToken(loggedInUser.token)
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.get(baseUrl, config)
  return request.data
}

const getConvo = async (id) => {
  setToken(loggedInUser.token)
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.get(`${baseUrl}/${id}`, config)
  return request.data
}

const removeConvo = async (id) => {
  setToken(loggedInUser.token)
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(`${baseUrl}/${id}`, loggedInUser.username, config)
  return request.data
}



export default { create, setToken, getAll, getConvo, removeConvo }