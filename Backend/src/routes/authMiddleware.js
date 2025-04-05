const jwt = require('jsonwebtoken')
const express = require('express')


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'No Autorizado' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error en la autenticación: ', err);
            res.status(403).json({ error: 'No tienes acceso para ver este recurso' });
            return;
        }

        next()
    });
}

module.exports = authenticateToken