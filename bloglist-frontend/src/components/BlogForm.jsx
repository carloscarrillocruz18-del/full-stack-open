import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Crear nuevo blog</h2>
      <form onSubmit={addBlog}>
        <div>
          título:
          <input
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder='título del blog'
          />
        </div>
        <div>
          autor:
          <input
            value={author}
            onChange={event => setAuthor(event.target.value)}
            placeholder='autor del blog'
          />
        </div>
        <div>
          URL:
          <input
            value={url}
            onChange={event => setUrl(event.target.value)}
            placeholder='url del blog'
          />
        </div>
        <button type="submit">crear</button>
      </form>
    </div>
  )
}

export default BlogForm