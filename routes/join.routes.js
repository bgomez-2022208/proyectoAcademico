const { Router } = require('express');
const { check } = require ('express-validator');

const { getCursosByProfesor} = require('../controllers/curso.controller');
const { joinPost} = require('../controllers/join.controller');
const { validarCampos} = require ('../middlewares/validar-campos');
const { validarJWTProfesor } = require('../middlewares');
const router = Router();

router.post(
    "/",
    [
        check("materia", "El id no debe ir vacio").not().isEmpty(),
         check("estudiantes","el estudiante no tiene que ir vacio").not().isEmpty(),
         //check("estudiantes").isArray({min: 0, max: 3}).withMessage("No puedes agregar más de 3 estudiantes por curso"),

        
         validarCampos,

    ], joinPost);


router.get(
    "/:profesor",
    [
        validarJWTProfesor,
        check('profesor', 'El nombre del profesor es requerido').notEmpty(),
    validarCampos
    ], getCursosByProfesor);

module.exports = router;