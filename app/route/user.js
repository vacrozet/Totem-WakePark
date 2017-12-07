const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.put('/signup', require('../controleur/user/signup.js'))
router.get('/signin', require('../controleur/user/signin.js'))
router.get('/all', middle('USER'), require('../controleur/user/all.js'))
router.put('/add', middle('USER'), require('../controleur/user/addUser.js'))
router.patch('/superuser', middle('USER'), require('../controleur/user/superUser.js'))
router.delete('/delete', middle('USER'), require('../controleur/user/delete.js'))

module.exports = router
