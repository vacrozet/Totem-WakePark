var db = require('../../db.js')

function error (res, code, bool, message, result) {
  res.status(code)
  res.json({
    success: bool,
    message: message,
    result: result
  })
}

module.exports = (req, res) => {
  if (req.query.dir === undefined) {
    return error(res, 403, false, 'Query Not Found')
  }
  db.get().then((db) => {
    db.collection('Picture').find({_id: req.query.dir}).toArray((err, result) => {
      if (err) return error(res, 500, false, 'Internal Server Error', '')
      if (result[0].pictures.length === 0) return error(res, 404, false, '')
      res.status(200)
      return res.json({
        success: true,
        result: result
      })
    })
  })
}
