var fs = require('fs')
const path = require('path')
const dir = path.dirname(require.main.filename) + '/pictures/'

module.exports = (req, res) => {
  var chemin = dir + req.params.dir
  // console.log(`le chemin --> ${chemin}`)
  // console.log(dir + req.params.dir + '/')
  // console.log(req.params)
  // console.log(req.params.folder)
  // console.log(req.params.name)
  console.log(chemin + '/' + req.params.folder + '/' + req.params.name)
  if (req.params.type === '.jpg') {
    if (fs.existsSync(chemin) && fs.existsSync(chemin + '/' + req.params.folder + '/' + req.params.name)) {
      console.log('la photo existe')
      res.set('Content-Type', 'image/jpeg')
      res.sendFile(chemin + '/' + req.params.folder + '/' + req.params.name)
    }
  }
  if (req.params.type === '.png') {
    if (fs.existsSync(chemin) && fs.existsSync(chemin + '/' + req.params.folder + '/' + req.params.name)) {
      console.log('la photo existe')
      res.set('Content-Type', 'image/png')
      res.sendFile(chemin + '/' + req.params.folder + '/' + req.params.name)
    }
  }
}
