const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })

  // Change _id to id
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({error: "title and url are required"})
  }

  const user = request.user

  const savedBlog = new Blog({title: body.title, author: body.author, url: body.url, likes: body.likes,
    user: user.id})

  result = await savedBlog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(result)

})


blogsRouter.delete('/:id', async (request, response) => {

   const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  result.user = request.user
  response.status(201).json(result)
})


module.exports = blogsRouter