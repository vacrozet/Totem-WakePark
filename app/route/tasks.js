const express = require('express')
const router = express.Router()

router.get('/weather', require('../controleur/tasks/weather.js'))
router.get('/news', require('../controleur/tasks/news.js'))

module.exports = router
