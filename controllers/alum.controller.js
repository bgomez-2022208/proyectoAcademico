const bcryptjs = require('bcryptjs');
const Alumnos = require('../models/Alumnos');
const { response } = require('express');

const alumGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, alumnos] = await Promise.all([
        Alumnos.countDocuments(query),
        Alumnos.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        alumnos
    });
}

const getAlumById = async (req, res) => {
    const {id} = req.params;
    const alumnos = await Alumnos.findOne({_id: id});

    res.status(200).json({
        alumnos
    });
}

const putAlumnos = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, password, google, correo, ...resto } = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await Alumnos.findByIdAndUpdate(id, resto);

    const alumnos = Alumnos.findOne({id});

    res.status(200).json({
        msg: 'Alumno actualizado correctamente',
        alumnos
    });
}

const alumnosDelete = async (req, res) => {
    const {id} = req.params;
    const alumnos = await Alumnos.findByIdAndUpdate(id, {estado: false});
    const alumnoAutenticado = req.alumnos;

    res.status(200).json({
        msg: 'Alumno eliminado',
        alumnos,
        alumnoAutenticado
    });
}


const alumnosPost = async (req, res) => {
    const {nombre,correo,password,role} = req.body;
    const alumnos = new Alumnos({nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync();
    alumnos.password = bcryptjs.hashSync(password, salt);

    await alumnos.save();
    res.status(202).json({
        alumnos
    });
}


module.exports = {
    alumGet,
    getAlumById,
    putAlumnos,
    alumnosDelete,
    alumnosPost
}