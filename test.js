const moment = require('moment')

console.log(moment.unix(process.argv[2]).format('L'))
