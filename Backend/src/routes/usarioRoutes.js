const express = require('express')
const router = express.Router()
const {crearUsuario, actualizarUsuario} = require('../controllers/usuarioController')


// Rutas
router.post('/CrearUsuario', crearUsuario)
router.put('/ActualizarUsuario/:id', actualizarUsuario)


module.exports = router;