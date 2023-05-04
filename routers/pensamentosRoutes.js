const express = require('express')
const router = express.Router()
const PensamentoController = require('../controllers/PensamentoController')
//controller

//helper
const checkAuth = require('../helpers/auth').checkAuth


router.get('/add', checkAuth, PensamentoController.createPensamento)
router.post('/add', checkAuth, PensamentoController.createPensamentoSave)
router.get('/edit/:id', checkAuth, PensamentoController.updatePensamento)
router.post('/edit', checkAuth, PensamentoController.updatePensamentoSave)
router.get('/dashboard', checkAuth, PensamentoController.dashboard)
router.post('/remove', checkAuth, PensamentoController.removePensamento)
router.get('/', PensamentoController.showPensamentos)

module.exports = router