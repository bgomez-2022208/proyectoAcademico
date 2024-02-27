const { Router } = require('express');
const { check } = require ('express-validator');

//const { validarCampos } = require('../middlewares/validar-campos');


const { validarCampos, validarJWT, esAdminRole, tieneRolAutorizado,validarJWTProfesor } = require('../middlewares');


const {cursoGet, getCursoById, putCurso, cursoDelete, CursoPost} = require('../controllers/curso.controller');
const { existeByIdCurso,  existenteMateria} = require('../helpers/db-validators');

const router = Router();

router.get("/", cursoGet);


router.get(
    "/:id",
    [
        validarJWTProfesor,
        tieneRolAutorizado('TEACHER_ROLE'),
        check(`id`,"No es una materia  valida").isMongoId(),
        check(`id`).custom(existeByIdCurso),
        validarCampos
    ], getCursoById);

router.put(
    "/:id",
    [
    validarJWTProfesor,
    tieneRolAutorizado('TEACHER_ROLE'),
    check(`id`,`No es un id valido`).isMongoId(),
    check('id').custom(existeByIdCurso),
    validarCampos
        
    ], putCurso);

router.post(
    "/",
    [
    validarJWTProfesor,
    tieneRolAutorizado('TEACHER_ROLE'),
    check("materia", "El nombre no puede estar vacio").not().isEmpty(),
    check("materia").custom(existenteMateria),

    check("profesor", "El nombre del profesor no puede estar vacio").not().isEmpty(),
    check("descripcion", "El descripcion no puede estar vacia").not().isEmpty(),
    
    validarCampos,
    ], CursoPost);

router.delete(
    "/:id",
    [
    validarJWTProfesor,
    tieneRolAutorizado('TEACHER_ROLE'),
    check(`id`,`No es un id valido`).isMongoId(),
    check(`id`).custom(existeByIdCurso),
    validarCampos
    ], cursoDelete);

module.exports = router;