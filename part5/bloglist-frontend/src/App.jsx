import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl
    }


    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNewBlog('')
    setNewAuthor('')
    setNewUrl('')

    setSuccessMessage(`a new blog ${newBlog} by ${newAuthor} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
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


  return (
    <div>
      <h2>blogs</h2>
      {successMessage && <div style={{color: 'green'}}>{successMessage}</div>}
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlog}
            name="Blog"
            onChange={({target}) => setNewBlog(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({target}) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({target}) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default App