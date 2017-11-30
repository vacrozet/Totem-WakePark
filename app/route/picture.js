const express = require('express')
const router = express.Router()
// const middle = require('../middleware.js')

router.put('/directory', require('../controleur/picture/putdir.js'))
router.get('/directory', require('../controleur/picture/getdir.js'))
router.delete('/directory', require('../controleur/picture/deleteDirectory.js'))
router.put('/picture', require('../controleur/picture/putpicture.js'))
router.delete('/picture', require('../controleur/picture/deletePicture.js'))
router.patch('/addcomment', require('../controleur/picture/addcomment.js'))
router.get('/album', require('../controleur/picture/getalbum.js'))
router.get('/getpicture/:dir/:folder/:name/:type', require('../controleur/picture/getpicture.js'))

module.exports = router
