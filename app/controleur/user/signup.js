const db = require('../../db.js')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

function error (res, nb, success, message) {
  res.status(nb)
  return res.json({
    message: message
  })
}
function renvoi (res, nb, success, message) {
  res.status(nb)
  return res.json({
    success: success,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.body.pass === 'superUser') {
    var hash = bcrypt.hashSync(req.body.password, 10)
    db.get().then((db) => {
      let id = uuid()
      let tab = {
        _id: id,
        login: req.body.login,
        passwd: hash,
        tokens: []
      }
      db.collection('Users').insert(tab, null, (error, result) => {
        if (error) return error(res, 500, 'Internal server error')
      })
      renvoi(res, 200, true, 'INSCRIPTION REUSSIE')
    }).catch((err) => {
      return error(res, 500, err)
    })
  }
}
