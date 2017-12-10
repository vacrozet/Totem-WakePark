const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.put('/add', require('../controleur/newsletter/addMail.js'))
router.get('/mail', middle('USER'), require('../controleur/newsletter/getmail.js'))
router.delete('/mail', middle('USER'), require('../controleur/newsletter/deleteMail.js'))

module.exports = router
