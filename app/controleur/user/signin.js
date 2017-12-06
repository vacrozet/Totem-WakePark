const bcrypt = require('bcryptjs')
const db = require('../../db.js')

function genToken () {
  var str = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`
  var token = ''
  for (var count = 0; count < 128; count++) {
    token += str[Math.floor((Math.random() * str.length))]
  }
  return (token)
}
function erreur (res, text) {
  res.json({
    error: text
  })
}

function error1 (res, status, message) {
  res.status(status)
  res.json({
    error: message
  })
}
module.exports = (req, res) => {
  if (req.query.login === undefined || !req.query.login.match(/^([a-zA-Z0-9]+)$/)) {
    res.status(400)
    return res.json({
      message: 'login incorrect'
    })
  }
  db.get().then((db) => {
    db.collection('Users').find({login: req.query.login}).toArray((error, results) => {
      if (error) return error1(res, 500, 'Internal server error')
      if (results.length !== 1) return erreur(res, 'User Not Found')
      if (results[0].actif === false) return erreur(res, 'Please Check Your mail')
      if (!bcrypt.compareSync(req.query.passwd, results[0].passwd)) return erreur(res, 'Wrong Passwd')
      let superUser
      if (results[0].superUser === true) {
        superUser = true
      } else {
        superUser = false
      }
      let objToken = {}
      objToken.token = genToken()
      objToken.created_at = new Date().getTime()
      results[0].tokens.push(objToken)
      db.collection('Users').updateOne({login: req.query.login}, {$set: {tokens: results[0].tokens}}).then((res1) => {
        return res.json({
          success: true,
          message: 'Connexion reussie',
          superUser: superUser,
          token: objToken.token
        })
      }).catch((err1) => {
        return res.json({
          success: false,
          message: 'erreur'
        })
      })
    })
  })
}
