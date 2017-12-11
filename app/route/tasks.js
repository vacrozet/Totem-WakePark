const express = require('express')
const router = express.Router()

router.get('/weather', require('../controleur/tasks/weather.js'))

module.exports = router
