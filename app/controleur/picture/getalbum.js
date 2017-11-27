var db = require('../../db.js')

function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  db.get().then((db) => {
    db.collection('Picture').find({_id: req.query.dirName}).toArray((err, result) => {
      if (err) return error(res, 500, false, 'Internal Server Error')
      console.log(result[0].pictures.length)
      if (result[0].pictures.length === 0) {
        res.status(200)
        return res.json({
          success: true,
          result: ''
        })
      }
      res.status(200)
      return res.json({
        success: true,
        result: result
      })
    })
  })
}
