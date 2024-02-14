const bcryptjs = require('bcryptjs');
const Profesor = require('../models/Profesor');
const { response } = require('express');

const teachGet = async (req,res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, profesor] = await Promise.all([
        Profesor.countDocuments(query),
        Profesor.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        profesor
    });
}

const getTeachById = async (req, res) => {
    const {id} = req.params;
    const profesor = await Profesor.findOne({_id: id});

    res.status(200).json({
        profesor
    });
}

const putProfesor = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, password, google,correo, ...resto } = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    await Profesor.findByIdAndUpdate(id, resto);

    const profesor = Profesor.findOne({id});

    res.status(200).json({
        msg: 'Profesor actualizado exitosamente',
        profesor
    });
}

const profesorDelete = async (req, res) => {
    const {id} = req.params;
    const profesor = await Profesor.findByIdAndUpdate(id, {estado: false});
    const profesorAutenticado = req.profesor;

    res.status(200).json({
        msg: "Profesor eliminado",
        profesor,
        profesorAutenticado
    });
}

const profesorPost = async (req, res) => {
    const {nombre,correo,password,role} = req.body;
    const profesor = new Profesor({nombre, correo, password, role});

    profesor.role = 'TEACHER_ROLE';

    const salt = bcryptjs.genSaltSync();
    profesor.password = bcryptjs.hashSync(password, salt);

    await profesor.save();
    res.status(202).json({
        profesor
    });
}

module.exports = {
    teachGet,
    getTeachById,
    putProfesor,
    profesorDelete,
    profesorPost
}