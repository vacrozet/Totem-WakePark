const db = require('../../db.js')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

function error (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.user.superUser !== true || req.body.login === '' ||
  req.body.password === '') return error(res, 403, false, 'Not autorized')
  var hash = bcrypt.hashSync(req.body.password, 10)
  db.get().then((db) => {
    let id = uuid()
    let tab = {
      _id: id,
      login: req.body.login,
      passwd: hash,
      actif: false,
      superUser: false,
      lastConnexion: '',
      tokens: []
    }
    db.collection('Users').insert(tab, null, (error, result) => {
      if (error) return error(res, 500, 'Internal server error')
    })
    res.json({
      success: true,
      message: 'User Créer'
    })
  })
}
