const axios = require('axios')

module.exports = (req, res) => {
  axios.get('https://api.openweathermap.org/data/2.5/weather?id=3022633&appid=bb060a57debc6a5f35f94c390951a757&cnt=3').then((res1) => {
    // console.log('------------------------------------------------------')
    // console.log(res1.data)
    // console.log('------------------------------------------------------')
    res.json({
      success: true,
      result: res1.data
    })
  }).catch((err) => { console.log(err) })
}

// meteo: {
//   site: 'https://www.apixu.com/'
//   Key: "60a98d92084e415eb0e162324170611"
//   exemple: "http://api.apixu.com/v1/current.json?key=60a98d92084e415eb0e162324170611&q=46.237192,4.805336"
//   exemple: "http://api.apixu.com/v1/current.json?key=60a98d92084e415eb0e162324170611&q=46.237192,4.805336"
//   openWeatherMap: {key='bb060a57debc6a5f35f94c390951a757'}
// }
