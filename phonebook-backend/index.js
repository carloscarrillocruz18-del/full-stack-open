require('dotenv').config() // Tarea 3.13/3.14: Cargar variables de entorno del archivo .env
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person') // Importar el módulo Mongoose

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

// Token personalizado de morgan para mostrar el body en los POST
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Tarea 3.13: Obtener todas las personas desde la base de datos de MongoDB
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

// Tarea 3.13: Obtener información de la agenda contando los documentos en la base de datos
app.get('/info', (req, res) => {
  Person.countDocuments({}).then(count => {
    const currentDate = new Date()
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${currentDate}</p>
    `)
  })
})

// Obtener una persona por su ID de MongoDB
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Eliminar una persona de la base de datos (Tarea 3.15)
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// Tarea 3.14: Guardar una nueva persona en la base de datos
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'name missing' })
  }
  if (!body.number) {
    return res.status(400).json({ error: 'number missing' })
  }

  // Opcional pero recomendado: Validar si el nombre ya existe en la BD
  Person.findOne({ name: body.name })
    .then(existingPerson => {
      if (existingPerson) {
        return res.status(400).json({ error: 'name must be unique' })
      }

      const person = new Person({
        name: body.name,
        number: body.number,
      })

      person.save()
        .then(savedPerson => {
          res.json(savedPerson)
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

// Tarea 3.16: Manejador de errores para ID no válido (CastError u otros)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// Este debe ser el último middleware cargado
app.use(errorHandler)

// Puerto dinámico
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})