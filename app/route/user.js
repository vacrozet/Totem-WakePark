const express = require('express')
const router = express.Router()

router.put('/signup', require('../controleur/user/signup.js'))
router.get('/signin', require('../controleur/user/signin.js'))

module.exports = router
