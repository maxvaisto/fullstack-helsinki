const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  // Change _id to id
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    return response.status(400).json({error: "title and url are required"})
  }

  result = await blog.save()
  response.status(201).json(result)

})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body


  // const body = request.body
  //
  // const blog = {
  //   _id: request.params.id
  //   title: body.title,
  //   author: body.author,
  //   url: body.url,
  //   likes: body.likes
  //
  // }
  result = Blog.

  result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.status(201).json(result)
})


module.exports = blogsRouter