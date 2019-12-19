import axios from 'axios'
const baseUrl = 'http://localhost:3004/users/profile'

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


const get = (username) => {
  const request = axios.get(`/users/${username}`)
  return request.then(response => response.data)
}

export default { create, setToken, get }