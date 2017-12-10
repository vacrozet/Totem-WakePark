const db = require('../../db.js')

function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.user.superUser !== true ||
    req.query.mail === undefined) return error(res, 400, false, 'User Unauthorized')
  db.get().then((db) => {
    db.collection('Newsletter').find({_id: 'Newsletter'}).toArray((err, result) => {
      if (err) return error(res, 500, false, 'Internal Server Error')
      result[0].mail = result[0].mail.filter(tab => tab.mail !== req.query.mail)
      db.collection('Newsletter').update({_id: 'Newsletter'}, {$set: {mail: result[0].mail}}).then((res1) => {
        res.status(200)
        return res.json({
          success: true,
          message: 'mail supprimer'
        })
      }).catch((err1) => { console.log(err1) })
    })
  })
}
