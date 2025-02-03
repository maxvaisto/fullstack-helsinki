const { test, after, beforeEach, describe } = require('node:test')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require("node:assert");
const api = supertest(app)
const { usersInDb } = require('./test_helper')


beforeEach(async () => {
  await User.deleteMany({})
})


describe('when no users are saved initially', () => {

  test('get request returns all users', async () => {
    let val = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(val.body.length, 0)
  })

  test('post request adds a new user', async () => {
    const newUser = {
      username: 'test user',
      name: 'test name',
      password: 'test password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test('post request with no password returns 400', async () => {
    const newUser = {
      username: 'test user',
      name: 'test name',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('post request with password less than 3 characters returns 400', async () => {
    const newUser = {
      username: 'test user',
      name: 'test name',
      password: '12'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('post request with non-unique username returns 400', async () => {
    const newUser = {
      username: 'test user',
      name: 'test name',
      password: 'test password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('post request with no username returns 400', async () => {
    const newUser = {
      name: 'test name',
      password: 'test password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

})


after(() => {
  mongoose.connection.close()
});
