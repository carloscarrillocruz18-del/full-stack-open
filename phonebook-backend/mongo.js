const mongoose = require('mongoose')

// Verificar si se pasó al menos la contraseña
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

// URL de conexión con tus datos reales de MongoDB Atlas
const url = `mongodb+srv://carloscarrillocruz18_db_user:${password}@cluster0.ctd6hr5.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

// Definir el esquema y el modelo para la persona
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// CASO 1: Si se pasan 5 argumentos (node mongo.js password nombre numero), se guarda un registro
if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} 
// CASO 2: Si solo se pasa la contraseña (3 argumentos), se listan todos los registros
else if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  console.log('Invalid arguments. Use: node mongo.js <password> [name] [number]')
  mongoose.connection.close()
}