const bcryptjs = require('bcryptjs');
const Curso = require('../models/cursos');
const { response } = require('express');


const cursoGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {};

    const [total, materia] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        materia
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
    const {_id, materia, profesor, descripcion, ...resto } = req.body;

    if(materia){
        const salt = bcryptjs.genSaltSync();
        resto.materia = bcryptjs.hashSync(materia, salt);
    }

    await Curso.findByIdAndUpdate(id, resto);

    const curso = await Curso.findOne({_id: id});

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
    const {materia,profesor,descripcion} = req.body;
    const curso = new Curso({materia, profesor, descripcion});




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