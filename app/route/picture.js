const express = require('express')
const router = express.Router()
// const middle = require('../middleware.js')

router.put('/upload', require('../controleur/picture/upload.js'))
router.put('/putdir', require('../controleur/picture/putdir.js'))
router.get('/getdir', require('../controleur/picture/getdir.js'))

module.exports = router
