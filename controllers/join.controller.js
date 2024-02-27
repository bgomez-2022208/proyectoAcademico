const Cursos = require('../models/cursos');

const joinPost = async(req, res) =>{
    const { materia, estudiantes } = req.body;
    try {

        const cursos = await Cursos.findOne({materia});

        if (!cursos) {
            return res.status(400).json({
                msg: "El curso no se encuentra"
            });
        }

        // Verificar si el estudiante ya está en este curso
        if (cursos.estudiantes.includes(estudiantes)) {
            return res.status(400).json({
                msg: "El estudiante ya se encuentra en esta asignatura"
            });
        }

        // Verificar si el estudiante está en más de 3 cursos
        const cursosDelEstudiante = await Cursos.find({ estudiantes: estudiantes });
        if (cursosDelEstudiante.length >= 3) {
            return res.status(400).json({
                msg: "El estudiante ya está inscrito en 3 cursos"
            });
        }

        cursos.estudiantes.push(estudiantes);
        await cursos.save();

        res.status(200).json({
            msg: "Te uniste a una clase",
            materia,
        });

    } catch (e) {
        res.status(500).json({
            msg: `Error al unirse a un grupo: ${e}`
        });
    }
}

const cursoAlumDelete = async (req, res) => {
    const {id} = req.params;
    const materia = await Curso.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'Alumno eliminado de un curso',
        materia,
    });
}



module.exports = {
    joinPost,
    cursoAlumDelete
}