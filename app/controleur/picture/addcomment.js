const db = require('../../db.js')

function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.body.dir === undefined || req.body.idPic === undefined || req.body.commentPic === undefined) {
    return error(res, 403, false, 'Query Not Found')
  }
  db.get().then((db) => {
    db.collection('Picture').findOne({ _id: req.body.dir }).then(res => {
      res.pictures.forEach(elmt => {
        if (req.body.idPic === elmt.id) elmt.comment = req.body.commentPic
      })
      db.collection('Picture').update({ _id: req.body.dir }, {$set: {'pictures': res.pictures}}).then(result => {
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  })
  res.status(200)
  res.json({
    success: true
  })
}
