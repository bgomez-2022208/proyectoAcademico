const { Router } = require('express');
const { check } = require ('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');


const {cursoGet, getCursoById, putCurso, cursoDelete, CursoPost} = require('../controllers/curso.controller');
const { existeByIdCurso} = require('../helpers/db-validators');

const router = Router();

router.get("/", cursoGet);


router.get(
    "/:id",
    [
        check(`id`,"No es un id valido").isMongoId(),
        check(`id`).custom(existeByIdCurso),
        validarCampos
    ], getCursoById);

router.put(
    "/:id",
    [
    check(`id`,`No es un id valido`).isMongoId(),
    check('id').custom(existeByIdCurso),
    validarCampos
        
    ], putCurso);

router.post(
    "/",
    [
    check("materia", "El nombre no puede estar vacio").not().isEmpty(),
    check("profesor", "El nombre del profesor no puede estar vacio").not().isEmpty(),
    check("descripcion", "El descripcion no puede estar vacia").not().isEmpty(),
    
        
    validarCampos,
    ], CursoPost);

router.delete(
    "/:id",
    [
    check(`id`,`No es un id valido`).isMongoId(),
    check(`id`).custom(existeByIdCurso),
    validarCampos
    ], cursoDelete);

module.exports = router;