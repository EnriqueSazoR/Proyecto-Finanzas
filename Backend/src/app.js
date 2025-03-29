// Importaciones
const express = require('express')
const { config } = require('dotenv')
const cors = require('cors')
require('../src/basedatos/db')
const usuarioRutas = require('./routes/usarioRoutes')

config()

const app = express(); // Instancia de express

// Middlewares
app.use(express.json()); // Para manejar JSON en las solicitudes
app.use(cors()); // Para permitir conexiones desde el frontend

// Ruta de prueba
app.get('/api/test', (req, res ) => {
    res.json({message: '!El servidor funciona correctamente! '})
})

// Usar ruta de usuarios
app.use('/api', usuarioRutas)

// Definir puerto
const port = process.env.PORT || 3000

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutandose en el puerto ${port}`)
}) 


