const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'la contrse;a es obligatoria']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        require: true,
        enum: ["ADMIN_ROLE", "USER_ROLE", "STUDENT_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

AlumnoSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...alumno} = this.toObject();
    alumno.uid = _id;
    return alumno;
};

module.exports = model('Alumnos', AlumnoSchema)