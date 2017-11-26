const fs = require('fs')
const checkBase = require('check-base-encoding')
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
  console.log(req.body.name)
  if (!fs.existsSync(picsDir)) fs.mkdirSync(picsDir)
  if (!fs.existsSync(picsCarousel)) fs.mkdirSync(picsCarousel)
  let base64Data
  if (req.body.type === '.png') {
    base64Data = req.body.pic.replace(/^data:image\/png;base64,/, '')
  } else {
    base64Data = req.body.pic.replace(/^data:image\/jpeg;base64,/, '')
  }
  if (!checkBase.isBase64(base64Data)) return error(res, 'Invalid photo', 403)
  res.status(200)
  res.json({
    success: true
  })
  fs.writeFile(picsCarousel + req.body.name, base64Data, 'base64', (err) => {
    if (err) console.log(err)
  })
}
