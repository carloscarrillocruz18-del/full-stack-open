const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const passwordHash = await bcrypt.hash('password123', 10)
  
  const db = mongoose.connection.db
  const existing = await db.collection('users').findOne({ username: 'carlos' })
  
  if (existing) {
    console.log('El usuario carlos ya existe')
  } else {
    await db.collection('users').insertOne({
      username: 'carlos',
      name: 'Carlos',
      passwordHash,
      blogs: []
    })
    console.log('¡Usuario carlos creado con éxito! Contraseña: password123')
  }
  mongoose.connection.close()
})