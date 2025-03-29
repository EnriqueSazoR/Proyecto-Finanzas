// Definir cadena de conexión.
const { config } = require('dotenv')
const mongoose = require('mongoose')

config()

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME})
const db = mongoose.connection;

// Eventos para menejar errores y confirmar conexión
db.on('error', (error) => console.error(' Error de conexión a MongoDB: ', error));
db.once('open', () => console.log('Conectado a MongoDB'))

// Exportar archivo
module.exports = db;