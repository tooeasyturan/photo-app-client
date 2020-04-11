import axios from 'axios'
const baseUrl = 'http://localhost:3004/messages'

let token = null

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
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedTFPappUser'))
  setToken(loggedInUser.token)
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.get(baseUrl, config)
  return request.data
}

const getConvo = async (id) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedTFPappUser'))
  setToken(loggedInUser.token)
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.get(`${baseUrl}/${id}`, config)
  return request.data
}


export default { create, setToken, getAll, getConvo }