import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogsVisible, setBlogsVisible] = useState(false)

  const updateBlogList = async () => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user === null) {
      return
    }
    updateBlogList()
  }, [user])

  const updateBlog = async (id, updatedBlog) => {
    const updated = await blogService.update(id, updatedBlog)
    updateBlogList()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {

    if (window.confirm('Are you sure you want to delete this blog?')) {
      await blogService.remove(id)
      updateBlogList()
      setSuccessMessage('blog deleted')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }

  }

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    await blogService.create(blogObject)
    updateBlogList()
    setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <h2>log in to application</h2>
        <form onSubmit={handleLogin} name="loginForm">
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const addBlogForm = () => {
    const hideWhenVisible = { display: blogsVisible ? 'none' : '' }
    const showWhenVisible = { display: blogsVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogsVisible(true)}>add blog</button>
        </div>
        <div style={showWhenVisible}>
          <h2>create new</h2>

          <BlogForm createBlog={addBlog}/>
          <button onClick={() => setBlogsVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      {addBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} update={updateBlog} remove={deleteBlog}/>
      )}
    </div>
  )
}

export default App