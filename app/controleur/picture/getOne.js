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
    db.collection('Picture').find().sort({_id: -1}).limit(1).toArray((err, result) => {
      if (err) return error(res, 403, false, 'Internal Server Error', null)
      console.log(result)
    })
  })
}
