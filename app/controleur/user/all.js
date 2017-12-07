const db = require('../../db.js')
const moment = require('moment')

function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

function getMomentJs (time) {
  return (moment.unix(time / 10).startOf().fromNow())
}

module.exports = (req, res) => {
  db.get().then((db) => {
    db.collection('Users').find({}).toArray((err, result) => {
      if (err) error(res, 500, false, 'Internal Server Error')
      result = result.filter(res => res.login !== req.user.login)
      result.forEach(element => {
        element.lastConnexion = getMomentJs(element.lastConnexion)
        delete element.tokens
        delete element.passwd
      })
      res.json({
        success: true,
        result: result
      })
    })
  })
}
