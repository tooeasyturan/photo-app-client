import axios from 'axios'
const baseUrl = 'http://localhost:3004/users'
const authUrl = 'http://localhost:3004/auth'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const auth = async credentials => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(authUrl, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}



// const deleteUser = () => {
//   const request = axios.delete}

export default { getAll, create, update, auth, setToken }