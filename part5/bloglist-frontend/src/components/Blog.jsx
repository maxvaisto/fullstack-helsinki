import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, update, remove }) => {

  const [isExpanded, setIsExpanded] = useState(false)

  // console.log("blog:", blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!isExpanded) {
    return (<div style={blogStyle} className="togglableContent">
      <div>
        {blog.title} {blog.author} <button onClick={() => setIsExpanded(true)}>view</button>
      </div>
    </div>)
  }

  const like = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    update(blog.id, updatedBlog)

  }
  // Show the user's name if it exists
  return (<div style={blogStyle} className="togglableContent">
    <div>
      <p> {blog.title} {blog.author}
        <button onClick={() => setIsExpanded(false)}>hide</button>
      </p>
      <p> {blog.url} </p>
      <p> {blog.likes}
        <button onClick={like}>like </button> </p>
      <p> {blog.user ? blog.user.name : ''} </p>
    </div>
    <button onClick={() => remove(blog.id)}>remove</button>
  </div>)
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}


export default Blog