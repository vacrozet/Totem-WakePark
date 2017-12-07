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

function erreur (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.query.login === undefined || !req.query.login.match(/^([a-zA-Z0-9]+)$/)) return erreur(res, 400, false, 'login incorrect')
  db.get().then((db) => {
    db.collection('Users').find({login: req.query.login}).toArray((error, results) => {
      if (error) return erreur(res, 500, false, 'Internal server error')
      if (results.length !== 1) return erreur(res, 403, false, 'User Not Found')
      if (!bcrypt.compareSync(req.query.passwd, results[0].passwd)) return erreur(res, 403, false, 'Wrong Passwd')
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
      let time = Math.round(Date.now() / 100)
      db.collection('Users').updateOne({login: req.query.login}, {
        $set: {tokens: results[0].tokens, lastConnexion: time}
      }).then((res1) => {
        return res.json({
          success: true,
          message: 'Connexion reussie',
          superUser: superUser,
          token: objToken.token
        })
      }).catch((err1) => { return erreur(res, 409, false, 'erreur requete') })
    })
  })
}
