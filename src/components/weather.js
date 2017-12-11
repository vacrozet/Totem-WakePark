import React, { Component } from 'react'
import { local } from '../utils/api.js'
// import ReactWeather from 'react-open-weather'
var Forecast = require('react-forecast')

class Weather extends Component {
  constructor (props) {
    super(props)
    this.state = {
      meteo: []
    }
  }

  componentWillMount () {
    local().get('/tasks/weather').then((res) => {
      if (res.data.success === true) {
        console.log(res.data.result)
        this.setState({meteo: res.data.result})
      }
    }).catch((err) => { console.log(err.response) })
  }

  render () {
    return (
      <div>
        <Forecast latitude={34.05} longitude={118.25} name='Los Angeles' />
        <Component />
        {/* <ReactWeather
          forecast='today'
          apikey='60a98d92084e415eb0e162324170611'
          type='city'
          city='Creches-sur-Saone'
        /> */}
      </div>
    )
  }
}

export default Weather
