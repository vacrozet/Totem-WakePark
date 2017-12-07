var db = require('../../db.js')

function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: false,
    message: message
  })
}

module.exports = (req, res) => {
  db.get().then((db) => {
    db.collection('Picture').find().toArray((err, all) => {
      if (err) return error(res, 500, false, 'Internal Server Error')
      let resultat = []
      all.forEach(element => { resultat.push(element._id) })
      res.status(200)
      return res.json({
        success: true,
        result: resultat
      })
    })
  })
}
