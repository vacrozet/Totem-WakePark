const express = require('express')
const router = express.Router()
// const middle = require('../middleware.js')

router.get('/weather', require('../controleur/tasks/weather.js'))

module.exports = router
