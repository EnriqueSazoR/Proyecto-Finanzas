const express = require('express')
const router = express.Router()
const {crearUsuario, actualizarUsuario} = require('../controllers/usuarioController')


// Rutas
router.put('/ActualizarUsuario/:id', actualizarUsuario)


module.exports = router;