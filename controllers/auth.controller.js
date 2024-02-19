const { request, response } = require("express");
const Alumno = require("../models/Alumnos");
const Profesor = require("../models/Profesor");
const bycryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");


const login = async (req = request, res = response) => {
    const { correo, password } = req.body;
    

    try{
        const profesor = await Profesor.findOne({correo});
        const alumno = await Alumno.findOne({correo});
        if(!alumno && !profesor){
            return res.status(400).json({
                msg: "Credencias incorrectas, correo no existe en la base de datos."
            });
        }

        if (alumno) {
            if(!alumno.estado){
                return res.status(400).json({
                    msg: " El alumno no existe en la base de datos."
                });
             };
    
             const validarPassword = bycryptjs.compareSync(password, alumno.password);
             if(!validarPassword){
                return res.status(400).json({
                    msg: "La contraseña es incorrecta"
                })
             }
    
             const token = await generarJWT(alumno.id);
    
             res.status(200).json({
                msg: "Bienvenido",
                alumno,
                token
             });
        }
         
         if (profesor) {
            if(!profesor.estado){
                return res.status(400).json({
                    msg: " El alumno no existe en la base de datos."
                });
             };
    
             const validarPassword = bycryptjs.compareSync(password, profesor.password);
             if(!validarPassword){
                return res.status(400).json({
                    msg: "La contraseña es incorrecta"
                })
             }
    
             const token = await generarJWT(profesor.id);
    
             res.status(200).json({
                msg: "Bienvenido",
                profesor,
                token
             });
             
         }

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el administrador"
        });
    };


};

module.exports = {
    login
}