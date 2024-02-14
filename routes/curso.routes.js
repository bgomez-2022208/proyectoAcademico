const { Router } = require('express');
const { check } = require ('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');


const {cursoGet, getCursoById, putCurso, cursoDelete, CursoPost} = require('../controllers/curso.controller');
const { existeByIdCurso,existenteEmailAlumnos, esRoleValido } = require('../helpers/db-validators');

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
    check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
    check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
    check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
    
        //        check("role").custom(esRoleValido),
        
                validarCampos,
            ], alumnosPost);