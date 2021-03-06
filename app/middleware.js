const db = require('./db.js')

/**
 * Header auth : [Authorization : 'Bearer [tokens]']
 */

function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (role) => {
  return (req, res, next) => {
    var auth = req.get('Authorization')
    if (auth === undefined) return error(res, 400, false, 'Need Authorization in header')
    auth = auth.split(' ')
    if (auth[0] !== 'Bearer' || auth[1].length !== 128 || auth.length !== 2) return error(res, 400, false, 'Wrong authorization header')
    db.get().then((db) => {
      db.collection('Users').find({
        tokens: { // tokens
          $elemMatch: { // each first array
            token: auth[1]
          }
        }
      }).toArray((err, result) => {
        if (err) return error(res, 500, false, 'Internal server error')
        if (result.length !== 1) return error(res, 404, false, 'User not connected')
        req.user = {
          login: result[0].login,
          superUser: result[0].superUser,
          actif: result[0].actif
        }
        next()
      })
    })
  }
}
