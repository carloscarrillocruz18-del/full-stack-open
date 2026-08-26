const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// Obtenemos la URL de las variables de entorno o usamos una por defecto
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function(v) {
        // Valida que sean 2 o 3 dígitos, un guion, y luego más dígitos
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} no es un número de teléfono válido. Debe tener el formato XX-XXXXXXX o XXX-XXXXXXX`
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)