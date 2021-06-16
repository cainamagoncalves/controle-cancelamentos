const express = require('express')
const session = require('express-session')
const router = express.Router()
const control = require('./Controllers')

router.use(express.json())
router.use(express.urlencoded({extended: true}));
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

router.route('/teste')
    .get(control.getTeste)


module.exports = router

