const db = require('../../db.js')

function error (res, code, bool, message, result) {
  res.status(code)
  res.json({
    success: bool,
    message: message,
    result: result
  })
}

module.exports = (req, res) => {
  db.get().then((db) => {
    db.collection('Picture').find({}).toArray((err, result) => {
      if (err) return error(res, 403, false, 'Internal Server Error', null)
      if (result === null) return error(res, 403, false, 'Any Directory', null)
      return res.json({
        success: true,
        message: 'Array Found',
        result: result
      })
    })
  })
}
