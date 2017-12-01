const db = require('../../db.js')

function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.query.id !== undefined) {
    db.get().then((db) => {
      db.collection('Gammes').find({_id: req.query.id}).toArray((err, result) => {
        if (err) return error(res, 500, false, 'Internal Server Error')
        res.json({
          success: true,
          message: 'Gamme Found',
          result: result
        })
      })
    })
  } else {
    db.get().then((db) => {
      db.collection('Gammes').find({}).toArray((err, result) => {
        if (err) return error(res, 500, false, 'Internal Server Error')
        if (result.length === 0) return error(res, 403, false, 'Array Not Found')
        let resultat = []
        result.forEach(element => {
          resultat.push(element.id)
        })
        res.json({
          success: true,
          message: 'Array Found',
          result: resultat
        })
      })
    })
  }
}
