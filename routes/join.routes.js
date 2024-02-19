const { Router } = require('express');
const { check } = require ('express-validator');


const { joinPost, cursoAlumDelete} = require('../controllers/join.controller');
const { validarCampos} = require ('../middlewares/validar-campos');

const router = Router();

router.post(
    "/",
    [
        check("materia", "El id no debe ir vacio").not().isEmpty(),
         check("estudiantes","el estudiante no tiene que ir vacio").not().isEmpty(),
         validarCampos,

    ], joinPost);



router.delete(
    "/:id",
    [
    check(`id`,`No es un id valido`).isMongoId(),
    validarCampos
    ], cursoAlumDelete);

module.exports = router;