const { Router } = require('express');
const { check } = require ('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {teachGet, getTeachById, putProfesor, profesorDelete, profesorPost} = require('../controllers/teach.controller');
const { existenteEmailProfesor,existeUsuarioByIdProfesor, esRoleValido } = require('../helpers/db-validators');


const router = Router();

router.get("/", teachGet);

router.get(
    "/:id",
    [
        check(`id`, "no es un id valido").isMongoId(),
        check(`id`).custom(existeUsuarioByIdProfesor),
        validarCampos
    ], getTeachById);


router.put(
    "/:id",
    [
        check(`id`,`No es un id valido`).isMongoId(),
        check(`id`).custom(existeUsuarioByIdProfesor),
        validarCampos
    ], putProfesor);

router.post(
    "/",
    [
        check("nombre", "el nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({min:6}),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmailProfesor),

        validarCampos,
    ], profesorPost);

    router.delete(
        "/:id",
        [
            check(`id`,`No es un id valido`).isMongoId(),
            check(`id`).custom(existeUsuarioByIdProfesor),
            validarCampos
        ], profesorDelete);

module.exports = router;