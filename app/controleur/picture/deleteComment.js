const db = require('../../db.js')

function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.query.idPic === undefined || req.query.dir === undefined) return error(res, 403, false, 'Query Not Found')
  db.get().then((db) => {
    db.collection('Picture').findOne({_id: req.query.dir}).then((result) => {
      result.pictures.forEach(elmt => {
        if (elmt.id === req.query.idPic) elmt.comment = ''
      })
      db.collection('Picture').update({_id: req.query.dir}, {$set: {pictures: result.pictures}}).then((res1) => {
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  })
  res.status(200)
  res.json({
    success: true,
    message: 'Commentaire Supprimé'
  })
}
