const reduce = require('lodash/reduce')

const dummy = (blogs) => {
  // ...

  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => {
    return max.likes > item.likes ? max : item
  }

  return blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  const value_dict = reduce(blogs, (acc, blog) => {
    if (acc[blog.author]) {
      acc[blog.author] += 1
    } else {
      acc[blog.author] = 1
    }
    return acc
  }, {})

  const max = reduce(value_dict, (acc, value, key) => {
    return acc.value > value ? acc : {author: key, blogs: value}
  }, {})

  return max
}

const mostLikes = (blogs) => {
  const value_dict = reduce(blogs, (acc, blog) => {
    if (acc[blog.author]) {
      acc[blog.author] += blog.likes
    } else {
      acc[blog.author] = blog.likes
    }
    return acc
  }, {})

  const max = reduce(value_dict, (acc, likes, author) => {
    return acc.likes > likes ? acc : {author: author, likes: likes}
  }, {})

  return max
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}