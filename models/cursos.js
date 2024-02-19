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
    

    descripcion:{
        type: String,
        required: [true, "a;ade una descripcion al curso"]
    },
    estudiantes:{
        type: [String],
    },
    estado:{
        type: Boolean,
        default: true
    }
    
});

module.exports = model('Curso', CursoSchema)