const db = require('../../db.js')

module.exports = (req, res) => {
  if (req.body.mail.match()) {
    db.get().then((db) => {
      db.collection('Newsletter').update()
    })
  }
}
