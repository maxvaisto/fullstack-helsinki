import { useState } from 'react'


const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog,
      author: newAuthor,
      url: newUrl
    })
    setNewBlog('')
    setNewAuthor('')
    setNewUrl('')
  }

  return <form onSubmit={addBlog}>
    <div>
      title:
      <input
        data-testid="title"
        type="text"
        value={newBlog}
        name="Blog"
        onChange={({ target }) => setNewBlog(target.value)}
      />
    </div>
    <div>
      author:
      <input
        data-testid="author"
        type="text"
        value={newAuthor}
        name="Author"
        onChange={({ target }) => setNewAuthor(target.value)}
      />
    </div>
    <div>
      url:
      <input
        data-testid="url"
        type="text"
        value={newUrl}
        name="Url"
        onChange={({ target }) => setNewUrl(target.value)}
      />
    </div>
    <button type="submit">create</button>
  </form>
}

export default BlogForm