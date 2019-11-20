import axios from 'axios'
const baseUrl = 'http://localhost:3004/api/:id'


const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { create }