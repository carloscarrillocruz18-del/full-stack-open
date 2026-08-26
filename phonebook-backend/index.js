const express = require('express')
const app = express()

app.use(express.json())

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

// Tarea 3.1: Obtener todos los contactos
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// Tarea 3.2: Información sobre la cantidad de contactos y fecha actual
app.get('/info', (req, res) => {
  const count = persons.length
  const currentDate = new Date()
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${currentDate}</p>
  `)
})

// Tarea 3.3: Obtener un solo contacto por ID
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

// Tarea 3.4: Eliminar un contacto
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

// Función auxiliar para IDs aleatorios (Tarea 3.5)
const generateId = () => {
  return Math.floor(Math.random() * 1000000).toString()
}

// Tarea 3.5 y 3.6: Agregar contacto con validaciones
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})