import axios from 'axios'
import usersService from './users'
const baseUrl = 'http://localhost:3004/login'

const login = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  window.localStorage.setItem('loggedInUser', JSON.stringify(res.data))
  usersService.setToken(res.data.token)
  console.log(res.data)
  return res.data
}

export default { login }