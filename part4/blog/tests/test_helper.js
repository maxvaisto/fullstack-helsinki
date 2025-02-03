const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const sampleUser = {
  username: 'test_user_id',
  password: 'test_password'
}



const getToken = async () =>
{
  const response = await api
    .post('/api/login')
    .send(sampleUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return response.body.token
}

const registeredUser = await api
  .post('/api/users')
  .send(sampleUser)
  .expect(201)
  .expect('Content-Type', /application\/json/)

module.exports = {
  usersInDb
}