const db = require('../../db.js')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

function error (res, nb, success, message) {
  res.status(nb)
  res.json({
    message: message
  })
}
function renvoi (res, nb, success, message) {
  res.status(nb)
  res.json({
    success: success,
    message: message
  })
}

module.exports = (req, res) => {
  var hash = bcrypt.hashSync(req.body.password, 10)
  db.get().then((db) => {
    let id = uuid()
    let tab = {
      _id: id,
      login: req.body.login,
      passwd: hash,
      superUser: req.body.superUSer,
      tokens: []
    }
    db.collection('Users').insert(tab, null, (error, result) => {
      if (error) return error(res, 500, 'Internal server error')
    })
    return renvoi(res, 200, true, 'INSCRIPTION REUSSIE')
  }).catch((err) => { return error(res, 500, err) })
}
