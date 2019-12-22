import axios from 'axios'


const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username

const getUploads = () => {
  const request = axios.get(`http://localhost:3004/${username}`, { params: { username: username } })
  return request.then(response => response.data)
}

const getAvatar = () => {
  const request = axios.get(`http://localhost:3004/avatar/${username}`, { params: { username: username } })
  return request.then(response => response.data)
}

export default { getUploads, getAvatar }