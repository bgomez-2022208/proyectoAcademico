const jwt = require('jsonwebtoken');
const Alumno = require('../models/Alumnos');
const { request, response } = require('express');

const validarJWT = async(req = request, res = response, next)=> {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }

    try{
        //verificación del Token
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //leer usurio al que le corresponde ese uid
        const alumno = await Alumno.findById(uid);
        //verificar que el usuario exista
        if(!alumno){
            return res.status(401).json({
                msg: "Usuario no existe en la base de datos"
            });
        }

        if(!alumno.estado){
            return res.status(401).json({
                msg: "Token no válido, usuario con estado false"
            });
        }

        req.alumno = usuario;
        next();
        
    }catch(e){
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        })
    }
} 

module.exports = {
    validarJWT
}