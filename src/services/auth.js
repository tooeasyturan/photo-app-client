import axios from 'axios'
const baseUrl = 'http://localhost:3004/login'

const auth = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { auth }