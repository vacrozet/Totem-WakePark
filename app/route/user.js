const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.put('/signup', require('../controleur/user/signup.js'))
router.get('/signin', require('../controleur/user/signin.js'))
router.get('/all', middle('USER'), require('../controleur/user/all.js'))

module.exports = router
