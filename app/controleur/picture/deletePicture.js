const db = require('../../db.js')
const fs = require('fs')
const picsCarousel = require('path').dirname(require.main.filename) + '/pictures/' + 'carousel/'

function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.query.dir === undefined || req.query.idPic === undefined ||
    req.query.picType === undefined) return error(res, 403, false, 'Query Not Found')
  db.get().then((db) => {
    db.collection('Picture').findOne({_id: req.query.dir}).then((result) => {
      result.pictures = result.pictures.filter(tab => tab.id !== req.query.idPic)
      db.collection('Picture').update({_id: req.query.dir}, {$set: {'pictures': result.pictures}}).then((res1) => {
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  })
  fs.unlink(picsCarousel + req.query.dir + '/' + req.query.idPic + req.query.picType, (err) => {
    if (err) return error(res, 404, false, 'Picture Not Found')
    res.status(200)
    res.json({
      success: true,
      message: 'Picture Deleted'
    })
  })
}
