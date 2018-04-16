const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.post('/info', middle('USER'), require('../controleur/user/signup.js'))

module.exports = router
