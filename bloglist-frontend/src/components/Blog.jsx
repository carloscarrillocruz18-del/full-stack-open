import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  // Validar si el usuario logueado es el creador del blog para mostrar el botón eliminar (Ejercicio 5.11)
  const showDeleteBtn = blog.user && blog.user.username === user.username

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>ver</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>ocultar</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user ? blog.user.name || blog.user.username : 'Anónimo'}</div>
        {showDeleteBtn && (
          <button onClick={handleDelete}>
            eliminar
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog