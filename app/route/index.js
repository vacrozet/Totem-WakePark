const express = require('express')
const router = express.Router()

router.use('/tasks', require('./tasks.js'))
router.use('/picture', require('./picture.js'))
router.use('/tarifs', require('./tarifs.js'))

module.exports = router
