const db = require('../../db.js')

function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.body.mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    db.get().then((db) => {
      db.collection('Newsletter').find({_id: 'Newsletter'}).toArray((err, result) => {
        if (err) return error(res, 500, 'Internal server error')
        let capt = false
        result[0].mail.forEach(element => {
          if (element.mail === req.body.mail) capt = true
        })
        if (capt === true) return error(res, 204, false, 'vous êtes déjà abonné')
        let time = Math.round(Date.now() / 1000)
        let obj = {}
        obj.mail = req.body.mail
        obj.time = Math.round(Date.now() / 1000)
        result[0].mail.push(obj)
        db.collection('Newsletter').updateOne({_id: 'Newsletter'}, {$set: {mail: result[0].mail, lastAdded: time}}).then((res1) => {
          return res.json({
            success: true,
            message: 'Vous êtes maintenant abonné'
          })
        }).catch((err1) => { console.log(err1) })
      })
    })
  } else return error(res, 403, false, 'Query Not Correct')
}
