const express = require('express')
const router = express.Router()

router.use('/tasks', require('./tasks.js'))
router.use('/picture', require('./picture.js'))
router.use('/tarifs', require('./tarifs.js'))
router.use('/contact', require('./contact.js'))

module.exports = router
