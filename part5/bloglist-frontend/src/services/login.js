import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async credentials => {
  console.log('login attempt with:',credentials)
  const response = await axios.post(baseUrl, credentials)
  console.log('response:',response.data)
  return response.data
}

export default { login }