const express = require('express')
const router = express.Router()
// const middle = require('../middleware.js')

router.put('/putpicture', require('../controleur/picture/putpicture.js'))
router.put('/putdir', require('../controleur/picture/putdir.js'))
router.get('/getdir', require('../controleur/picture/getdir.js'))
router.get('/getalbum', require('../controleur/picture/getalbum.js'))
router.get('/getpicture/:dir/:folder/:name/:type', require('../controleur/picture/getpicture.js'))

module.exports = router
