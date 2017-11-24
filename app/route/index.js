const express = require('express')
const router = express.Router()

router.use('/tasks', require('./tasks.js'))

module.exports = router
