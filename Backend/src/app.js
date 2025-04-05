// Importaciones
const express = require('express')
const { config } = require('dotenv')
const cors = require('cors')
const usuarioRutas = require('./routes/usarioRoutes')
const authRutas = require('./routes/authRoutes')
const middleRutas = require('./routes/authMiddleware')
require('../src/basedatos/db')



config()

const app = express(); // Instancia de express

// Middlewares
app.use(express.json()); // Para manejar JSON en las solicitudes
app.use(cors({origin: 'http://localhost:4200'})); // Para permitir conexiones desde el frontend

// Rutas usuarios
app.use('/api', middleRutas, usuarioRutas)

// Rutas autenticacion
app.use('/auth', authRutas)

// Definir puerto
const port = process.env.PORT || 3000

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutandose en el puerto ${port}`)
}) 


