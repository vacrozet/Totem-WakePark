const db = require('../../db.js')

module.exports = (req, res) => {
  console.log(req.body)
  if (req.body.id !== undefined) {
    let tab = {}
    tab.id = req.body.id
    tab.title = req.body.id
    tab.overview = ''
    tab.prix = {}
    db.get().then((db) => {
      db.collection('Gammes').insert()
    })
  }
}
