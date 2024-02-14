const bcryptjs = require('bcryptjs');
const Curso = require('../models/cursos');
const { response } = require('express');


const cursoGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, curso] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        curso
    });
}

const getCursoById = async (req, res) => {
    const {id} = req.params;
    const curso = await Curso.findOne({_id: id});

    res.status(200).json({
        curso
    });
}

const putCurso = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, password, google, correo, ...resto } = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await Curso.findByIdAndUpdate(id, resto);

    const curso = Curso.findOne({id});

    res.status(200).json({
        msg: 'Curso Actualizado Exitosamente!!!',
        curso
    });
}

const cursoDelete = async (req, res) => {
    const {id} = req.params;
    const curso = await Curso.findByIdAndUpdate(id, {estado: false});
    const cursoAutenticado = req.alumnos;

    res.status(200).json({
        msg: 'Curso eliminado',
        curso,
        cursoAutenticado
    });
}


const CursoPost = async (req, res) => {
    const {nombre,correo,password,role} = req.body;
    const curso = new Curso({nombre, correo, password, role});



    const salt = bcryptjs.genSaltSync();
    curso.password = bcryptjs.hashSync(password, salt);

    await curso.save();
    res.status(202).json({
        curso
    });
}

module.exports = {
    cursoGet,
    getCursoById,
    putCurso,
    cursoDelete,
    CursoPost
}