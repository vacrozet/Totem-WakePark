const db = require('../../db.js')

function error (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}
module.exports = (req, res) => {
  if (req.user.superUser !== true || req.body.login === undefined ||
    req.body.superUser === undefined) return error(res, 403, false, 'Query not found')
  db.get().then((db) => {
    db.collection('Users').update({login: req.body.login}, {$set: {superUser: req.body.superUser}}).then((result) => {
    }).catch((err) => { console.log(err) })
  })
  res.json({
    success: true,
    message: 'User Update'
  })
}
