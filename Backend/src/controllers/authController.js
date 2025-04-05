const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



// Controlador para registrarse
const register = async(req, res) => {
    try {
        const {Nombre, Email, Password, Fecha_Creacion} = req.body

        if(!Nombre) {
            return res.status(400).json({
                message: "El nombre de usuario es obligatorio"
            })
        }
        if(!Email) {
            return res.status(400).json({
                message: "El email es obligatorio"
            })
        }
        if(!Password) {
            return res.status(400).json({
                message: "La contraseña es obligatoria"
            })
        }

        // Verificar si el usuario existe
        const usuarioExistente = await Usuario.findOne({Email})
        if(usuarioExistente) {
            return res.status(400).json({
                message: "El email ya ha sido registrado"
            })
        }

        // Hashear contraseña antes de guardarla
        const salto = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(Password, salto)

        const usuario = new Usuario(
            {
                Nombre,
                Email,
                Password: hashedPassword,
                Fecha_Creacion: Date.now()
            }
        )

        // Guardar el usuario en la bd
        const nuevoUsuario = await usuario.save()
        res.status(201).json({
            message: "Registro Exitoso"
        }) 

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}


// Controlador para iniciar sesion
const login = async(req, res) => {
    try {
        const {email, password} = req.body

        // Validaciones
        if(!email || !password) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            })
        }

        // Comprobar si el usuario existe
        const usuario = await Usuario.findOne({Email: email})
        if(!usuario){
            return res.status(400).json({
                message: "Credenciales Inválidas"
            })
        }

        // Comprobar contraseña
        const claveCorrecta = await bcrypt.compare(password, usuario.Password)
        if(!claveCorrecta) {
            return res.status(400).json({
                message: "Credenciales Inválidas"
            })
        }

        // Generar token
        const token = jwt.sign(
            {id: usuario._id, Email: usuario.Email},
            process.env.JWT_SECRET,
            {expiresIn: "2h"}
        )

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token,
            usuario: {
                nombre: usuario.Nombre,
                email: usuario.Email,
            },
        })
    } catch (error) {
        console.error("Error al iniciar sesión", error)
        res.status(500).json({
            message: "Fallo en el servidor"
        })
    }
}

module.exports = {
    login,
    register
}