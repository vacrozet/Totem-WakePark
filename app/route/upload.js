const express = require('express')
const router = express.Router()
// const middle = require('../middleware.js')

router.put('/upload', require('../controleur/picture/upload.js'))

module.exports = router
