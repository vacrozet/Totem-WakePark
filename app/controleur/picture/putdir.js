var db = require('../../db.js')

function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  let name = req.body.name.trim().replace(' ', '_')

  db.get().then((db) => {
    db.collection('Picture').find({_id: name}).toArray((err, result) => {
      if (err) return error(res, 500, false, 'Internal Server Error')
      if (result.length >= 1) return error(res, 302, false, 'Dossier existant')
      let tab = {
        _id: name,
        time: Math.round(Date.now() / 1000),
        pictures: []
      }
      db.collection('Picture').insert(tab, null, (error, results) => {
        if (error) return error(res, 500, false, 'Internal server error')
        db.collection('Picture').find().toArray((error1, all) => {
          if (error1) return error(res, 500, false, 'Internal server error')
          let resultat = []
          all.forEach(element => { resultat.push(element._id) })
          res.status(200)
          res.json({
            success: true,
            message: 'Dossier Créer',
            result: resultat
          })
        })
      })
    })
  })
}
