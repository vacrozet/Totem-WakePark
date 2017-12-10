const db = require('../../db.js')

function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.user.superUser !== true) return error(res, 401, false, 'User Unauthorized')
  db.get().then((db) => {
    db.collection('Newsletter').find({_id: 'Newsletter'}).toArray((err, result) => {
      if (err) return error(res, 500, false, 'Internal Server Errror')
      if (result[0]) {
        res.status(200)
        return res.json({
          success: true,
          message: 'Tab trouvé',
          result: result[0]
        })
      }
    })
  })
}
