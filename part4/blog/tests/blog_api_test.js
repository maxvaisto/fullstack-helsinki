const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const initialBlogs = require('./blog_list')
const app = require('../app')
const assert = require("node:assert");
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('get request returns all blogs', async () => {
   let val = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    assert.strictEqual(val.body.length, initialBlogs.length)
})

test('test id property', async () => {
  let val = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  val.body.forEach(blog => assert("id" in blog))
  val.body.forEach(blog => assert(!("_id" in blog)))
})


test('post request adds a new blog', async () => {
  const newBlog = {
    title: 'test blog',
    author: 'test author',
    url: 'test url',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await Blog.find({"title": "test blog", "author": "test author", "url": "test url", "likes": 0})
  assert.strictEqual(blogsAtEnd.length, 1)
})


test('post request with no likes adds a new blog with 0 likes', async () => {
  const newBlog = {
    title: 'test blog',
    author: 'test author',
    url: 'test url'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await Blog.find({"title": "test blog", "author": "test author", "url": "test url", "likes": 0})
  assert.strictEqual(blogsAtEnd.length, 1)
})

test('post request with no title and url returns 400', async () => {
  const newBlogWithoutTitle = {
    title: '',
    author: 'test author',
    url: 'test url',
    likes: 0
  }
  const newBlogWithoutUrl = {
    title: 'test blog',
    author: 'test author',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)
  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)

})

after(async () => {
  await mongoose.connection.close()
})

