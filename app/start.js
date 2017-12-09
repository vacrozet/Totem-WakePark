// Retrieve
const MongoClient = require('mongodb').MongoClient
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

let tab = []
if (process.argv[2] === undefined || process.argv[3] === undefined) {
  console.log('node script [login] [passwd]')
  process.exit()
} else {
  tab.push(process.argv[2])
  tab.push(process.argv[3])
}
var hash = bcrypt.hashSync(tab[1], 10)
let id = uuid()
let user = {
  _id: id,
  actif: true,
  login: tab[0],
  passwd: hash,
  superUser: true,
  lastConnexion: '',
  tokens: []
}

let mail = {
  _id: 'Newsletter',
  lastAdded: '',
  Mail: []
}

// Connect to the db
MongoClient.connect('mongodb://localhost:27017/totem_wake_park', (err, db) => {
  if (err) { return console.dir(err) }
  db.createCollection('Users', () => {
    console.log(`Create Table 'Users'`)
  })
  db.createCollection('Picture', () => {
    console.log(`Create Table Picture`)
  })
  db.collection('Users').insert(user, null, (err, result) => {
    if (err) {
      console.dir(err)
      process.exit()
    } else {
      console.log('User Insert')
    }
  })
  db.collection('Newsletter').insert(mail, null, (err, result) => {
    if (err) {
      console.dir(err)
      process.exit()
    } else {
      console.log('newsletter Insert')
    }
  })

  db.close()
})
