
const fs = require('fs')
const db = require('../../db.js')
const uuid = require('uuid')
// const checkBase = require('check-base-encoding')
const picsDir = require('path').dirname(require.main.filename) + '/pictures/'
const picsCarousel = require('path').dirname(require.main.filename) + '/pictures/' + 'carousel/'

function error (res, message, code) {
  res.status(code)
  res.json({
    success: false,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.body.dirName === undefined || req.body.pic === undefined || req.body.type === undefined) {
    return error(res, 'Query Not Found', 403)
  }
  let id = uuid()
  if (!fs.existsSync(picsDir)) fs.mkdirSync(picsDir)
  if (!fs.existsSync(picsCarousel)) fs.mkdirSync(picsCarousel)
  if (!fs.existsSync(picsCarousel + req.body.dirName)) fs.mkdirSync(picsCarousel + req.body.dirName)
  let base64Data
  if (req.body.type === '.png') {
    base64Data = req.body.pic.replace(/^data:image\/png;base64,/, '')
  } else {
    base64Data = req.body.pic.replace(/^data:image\/jpeg;base64,/, '')
  }
  // if (!checkBase.isBase64(base64Data)) return error(res, 'Invalid photo', 403)
  fs.writeFile(picsCarousel + req.body.dirName + '/' + id + req.body.type, base64Data, 'base64', (err) => {
    if (err) console.log(err)
  })
  let object = {}
  object.id = id
  object.type = req.body.type
  object.dir = req.body.dirName
  object.path = '/' + id + req.body.type
  object.comment = ''
  object.time = Math.round(Date.now() / 100)
  db.get().then((db) => {
    db.collection('Picture').update({_id: req.body.dirName},
      { $push: { pictures: object } })
  })
  res.status(200)
  res.json({
    success: true,
    message: 'Picture Added'
  })
}
