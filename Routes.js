const express = require('express')
const session = require('express-session')
const router = express.Router()
const control = require('./Controllers')

router.use(express.json())
router.use(express.urlencoded({ extended: true }));
router.use(
    session({
        secret: 'mudar123',
        resave: true,
        saveUninitialized: true,
    })
);

router.use((req, res, next) => next())

router.route('/clientes')
    .get(control.getClientes)

router.route('/bairros')
    .get(control.getBairros)

router.route('/motivos')
    .get(control.getMotivos)

router.route('/tiposconexao')
    .get(control.getTiposConexao)

router.route('/clientes')
    .post(control.postClientes)

router.route('/bairros')
    .post(control.postBairros)

router.route('/motivos')
    .post(control.postMotivos)

router.route('/tiposconexao')
    .post(control.postTiposConexao)

module.exports = router

