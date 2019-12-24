import axios from 'axios'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getUploads = () => {
  const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username
  const request = axios.get(`http://localhost:3004/${username}`, { params: { username: username } })
  return request.then(response => response.data)
}

const getAvatar = () => {
  const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username
  const request = axios.get(`http://localhost:3004/avatar/${username}`, { params: { username: username } })
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {
      'Authorization': token,
      'Content-Type': 'multipart/form-data'
    },
  }
  const response = await axios.post('http://localhost:3004/', newObject, config)
  return response.data
}



export default { getUploads, getAvatar, create, setToken }