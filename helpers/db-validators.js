const Profesor = require('../models/Profesor');
const Role = require('../models/role');
const Alumnos = require('../models/Alumnos');
const Alumnos = require('../models/cursos');


const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

const existenteEmailAlumnos = async (correo = '') => {
    const existeEmail = await Alumnos.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}

const existeUsuarioByIdAlumnos = async (id = '') => {
    const existeAlumnos = await Alumnos.findOne({id});
    if(existeAlumnos){
        throw new Error(`El usuario con el ${ id } no existe`)
    }
}


const existenteEmailProfesor = async (correo = '') => {
    const existeEmail = await Profesor.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}

const existeUsuarioByIdProfesor = async (id = '') => {
    const existeProfesor = await Profesor.findOne({id});
    if(existeProfesor){
        throw new Error(`El usuario con el ${ id } no existe`)
    }
}


const existeByIdCurso = async (id = '') => {
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error(`El usuario con el ${ id } no existe`)
    }
}




module.exports = {
    esRoleValido,
    existenteEmailAlumnos,
    existeUsuarioByIdAlumnos,
    existenteEmailProfesor,
    existeUsuarioByIdProfesor,
    existeByIdCurso
}