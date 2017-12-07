const db = require('../../db.js')

module.exports = (req, res) => {
  db.get().then((db) => { db.collection('Users').remove({_id: req.query.id}) })
  res.status(200)
  res.json({
    success: true,
    message: 'User delete'
  })
}
