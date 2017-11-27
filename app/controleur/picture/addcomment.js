const db = require('../../db.js')

module.exports = (req, res) => {
  console.log(req.body)
  console.log(req.body.commentPic)
  db.get().then((db) => {
    db.collection('Picture').find({_id: req.body.idPic}).toArray((err, result) => {
      console.log(result)
    })
      // {
      //   $set: {
      //     comment: req.body.commentPic
      //   }
      // })
  })
}
