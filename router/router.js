const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')


router.get("/", controller.homepage)
router.get('/add', controller.addRender)
router.post('/add', controller.addFunction)
router.get('/list', controller.listRender)
router.get('/delete/:id', controller.deleteFunction)
router.get('/edit/:id', controller.editFunction)
router.post('/update/:id', controller.insertEdit)

module.exports = router