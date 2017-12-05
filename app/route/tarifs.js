const express = require('express')
const router = express.Router()

router.get('/gamme', require('../controleur/tarifs/getGamme.js'))
router.put('/gamme', require('../controleur/tarifs/addGamme.js'))
router.delete('/gamme', require('../controleur/tarifs/deleteGamme.js'))
router.patch('/gamme', require('../controleur/tarifs/updateGamme.js'))
router.get('/all', require('../controleur/tarifs/allGamme.js'))

module.exports = router
