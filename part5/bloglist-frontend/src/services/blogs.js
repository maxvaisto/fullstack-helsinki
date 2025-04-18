import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log('newObject:',newObject)
  console.log('token:',token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const requestObject = {
    user: newObject.user.id,
    likes: newObject.likes,
    author: newObject.author,
    title: newObject.title,
    url: newObject.url
  }

  console.log('newObject:',requestObject)
  console.log('url:',`${baseUrl}/${id.toString()}`)
  const request = axios.put(`${baseUrl}/${id.toString()}`, requestObject, config)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, setToken, create, update, remove }