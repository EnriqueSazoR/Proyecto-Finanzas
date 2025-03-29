const mongoose = require('mongoose')

// Modelo Usuario
const UsuarioSchema = new mongoose.Schema(
    {
        Nombre: { type: String, required: true},
        Email: { type: String, required: true, unique: true},
        Password: { type: String, required: true},
        Fecha_Creacion: { type: Date, default: Date.now}
    }
)

// Exportar modelo
module.exports = mongoose.model('Usuario', UsuarioSchema)