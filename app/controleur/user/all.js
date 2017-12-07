const db = require('../../db.js')

function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  console.log(req.user)
  db.get().then((db) => {
    db.collection('Users').find({}).toArray((err, result) => {
      if (err) error(res, 500, false, 'Internal Server Error')
      result.forEach(element => {
        console.log(element)
      })
    })
  })
}
