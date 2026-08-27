const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const Blog = require('./models/blog')

const app = express()

app.use(cors())
app.use(express.json())

// Conexión a la base de datos
const mongoUrl = process.env.MONGODB_URI
console.log('connecting to database...')

mongoose.connect(mongoUrl, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Rutas de la API
app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

// Inicio del servidor
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})