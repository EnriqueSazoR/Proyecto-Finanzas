const Usuario = require('../models/Usuario')
const mongoose = require('mongoose')


// EndPoint Put - Modificar Usuario
const actualizarUsuario = async (req, res) => {
    try {
        const usuarioId = req.params.id

        if(!mongoose.Types.ObjectId.isValid(usuarioId)) {
            return res.status(400).json({
                message: 'ID no válido'
            })
        }

        const {Nombre, Email, Password} = req?.body
        // Verificar si se proporcionan datos
        if(!Nombre && !Email && !Password) {
            return res.status(400).json({
                message: 'Debe actualizar al menos un campo'
            })
        }

        // Buscar y actualizar
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            usuarioId,
            {Nombre, Email, Password},
            {new: true, runValidators: true}
        )

        // Verificar si existe el usuario actualizado
        if (!usuarioActualizado) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        res.status(200).json({
            message: 'Usuario actualizado correctamente',
        })

    } catch (error) {
        console.log(`Error al actualizar usuario ${error.message}`)
        res.status(500).json({
            messge: `Error de servidor ${error.message}`
        })
    }
}

module.exports = {
    actualizarUsuario
}