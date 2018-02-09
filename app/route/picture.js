const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.put('/directory', middle('USER'), require('../controleur/picture/putdir.js'))
router.get('/directory', middle('USER'), require('../controleur/picture/getdir.js'))
router.delete('/directory', middle('USER'), require('../controleur/picture/deleteDirectory.js'))
router.put('/picture', middle('USER'), require('../controleur/picture/putpicture.js'))
router.delete('/picture', middle('USER'), require('../controleur/picture/deletePicture.js'))
router.patch('/comment', middle('USER'), require('../controleur/picture/addComment.js'))
router.delete('/comment', middle('USER'), require('../controleur/picture/deleteComment.js'))
router.get('/album', middle('USER'), require('../controleur/picture/getalbum.js'))
router.get('/getpicture/:dir/:folder/:name/:type', require('../controleur/picture/getpicture.js'))
router.get('/all', require('../controleur/picture/all.js'))
router.get('/getone', require('../controleur/picture/getOne.js'))

module.exports = router
