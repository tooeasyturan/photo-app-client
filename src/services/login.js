import axios from 'axios'
const baseUrl = 'http://localhost:3004/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  console.log(response.data)
  return response.data
}

export default { login }