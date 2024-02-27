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

        if (cursos.estudiantes.includes(estudiantes)) {
            return res.status(400).json({
                msg: "El estudiante ya se encuentra en esta asignatura"
            });
        }

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

const getCursosByProfesor = async (req, res) => {
    const { profesor } = req.params;
 
    try {
        const cursos = await Curso.find({ profesor: profesor });
 
        if (!cursos || cursos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron cursos para este profesor.' });
        }
 
        res.status(200).json({ cursos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor.' });
    }
};

module.exports = {
    joinPost,
    getCursosByProfesor
}