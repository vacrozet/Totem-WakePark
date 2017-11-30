const db = require('../../db.js')
var rimraf = require('rimraf')
const picsCarousel = require('path').dirname(require.main.filename) + '/pictures/' + 'carousel/'

function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.query.dir === '') return error(res, 403, false, 'Query Not Found')
  db.get().then((db) => {
    db.collection('Picture').remove({_id: req.query.dir})
  })
  rimraf(picsCarousel + req.query.dir, (err) => {
    if (err) return error(res, 404, false, 'Directory Not Found')
    res.status(200)
    res.json({
      success: true,
      message: 'Directory delete'
    })
  })
}
