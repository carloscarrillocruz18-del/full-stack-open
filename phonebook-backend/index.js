const express = require('express')
const morgan = require('morgan') // Tarea 3.7: Importar morgan
const cors = require('cors') // Tarea 3.9: Importar cors para permitir peticiones del frontend
const app = express()

app.use(express.json())
app.use(cors()) // Tarea 3.9: Habilitar cors en todas las rutas
app.use(express.static('dist')) // Tarea 3.11: Servir archivos estáticos del frontend (carpeta dist)

// Tarea 3.8: Crear un token personalizado de morgan llamado 'body' para mostrar los datos de los POST
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

// Tarea 3.7 y 3.8: Configurar morgan con el formato 'tiny' más el token del body personalizado
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { 
    id: "1", 
    name: "Arto Hellas", 
    number: "040-123456" 
  },
  { 
    id: "2", 
    name: "Ada Lovelace", 
    number: "39-44-5323523" 
  },
  { 
    id: "3", 
    name: "Mary Poppendieck", 
    number: "39-23-6423122" 
  },
  { 
    id: "4", 
    name: "Dan Abramov", 
    number: "12-43-234345" 
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const count = persons.length
  const currentDate = new Date()
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${currentDate}</p>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 1000000).toString()
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'name missing' })
  }
  if (!body.number) {
    return res.status(400).json({ error: 'number missing' })
  }

  const nameExists = persons.some(p => p.name.toLowerCase() === body.name.toLowerCase())
  if (nameExists) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  res.json(person)
})

// Tarea 3.10: Puerto dinámico para producción (Render / Fly.io) o 3001 local
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})