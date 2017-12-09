const express = require('express')
const router = express.Router()
// const middle = require('../middleware.js')

router.put('/add', require('../controleur/newsletter/addMail.js'))

module.exports = router
