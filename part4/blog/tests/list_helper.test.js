const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogList = require('./blog_list')

test('dummy returns one', () => {
  const emptyList = []

  const result = listHelper.dummy(emptyList)
  assert.strictEqual(result, 1)
})


describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })



  test('when list has multiple blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogList)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('when list has multiple blogs, equals the favorite blog', () => {
    const result = listHelper.favoriteBlog(blogList)
    assert.deepStrictEqual(result, {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })
})

describe('most blogs', () => {
  test('when list has multiple blogs, equals the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogList)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('when list has multiple blogs, equals the author with most likes', () => {
    const result = listHelper.mostLikes(blogList)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})