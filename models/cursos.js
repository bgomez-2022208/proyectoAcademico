const { Schema, model } = require('mongoose');


const CursoSchema = Schema({
    materia:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    
    profesor:{
        type: String,
        required: [true, "el nombre del profesor es bligatorio"]
    },
    
    estado:{
        type: Boolean,
        default: true
    },

    horario:{
        type: String,
        required: [true, "El tiempo del curso es necesario"]
    },
    descripcion:{
        type: String,
        required: [true, "a;ade una descripcion al curso"]
    }
    
});

module.exports = model('Curso', CursoSchema)