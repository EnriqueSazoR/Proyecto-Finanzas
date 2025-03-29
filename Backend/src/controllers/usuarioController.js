const Usuario = require('../models/Usuario')
const mongoose = require('mongoose')

// EndPoint Post
const crearUsuario = async (req, res) => {  
    try {
        const {Nombre, Email, Password} = req?.body;

        if(!Nombre || !Email || !Password) {
            return res.status(400).json({
                message: 'Los Nombre, Email y Password son obligatorios'
            })
        }

        // Verificar si el usuario existe
        const usuarioExistente = await Usuario.findOne({Email});
        if (usuarioExistente) {
            return res.status(400).json({
                message: 'El usuario ya existe'
            })
        }

        // Crear nuevo usuario
        const usuario = new Usuario({
            Nombre,
            Email,
            Password,
            Fecha_Creacion: new Date()
        })

        // Guardar usuario
         await usuario.save() 
        res.status(201).json({
            message: `Usuario ${usuario.Nombre} creado correctamente`
        })

    } catch (error) {
        console.error(`Error al crear ${error.message}`)
        res.status(500).json({
            message: 'Error de servidor'
        })
    } 
}

// EndPoint Put
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
    crearUsuario,
    actualizarUsuario
}