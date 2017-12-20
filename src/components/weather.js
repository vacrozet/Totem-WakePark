import React, { Component } from 'react'
import { local } from '../utils/api.js'
import '../css/weather.css'

const moment = require('moment')
const weatherIcons = require('./weather_icon.json')

class Weather extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: '',
      temp: ''
    }
  }

  componentWillMount () {
    local().get('/tasks/weather').then((res) => {
      if (res.data.success === true) {
        console.log(res.data.result)
        const prefix = 'wi wi-'
        const code = res.data.result.weather[0].id
        var icon = weatherIcons[code].icon
        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
          icon = 'day-' + icon
        }
        icon = prefix + icon
        this.setState({
          location: res.data.result.name,
          temp: (res.data.result.main.temp - 273.15).toFixed(2),
          tempMax: (res.data.result.main.temp_max - 273.15).toFixed(0),
          tempMin: (res.data.result.main.temp_min - 273.15).toFixed(0),
          icon: icon,
          lever: moment.unix(res.data.result.sys.sunrise).format('LT'),
          coucher: moment.unix(res.data.result.sys.sunset).format('LT')
        })
      }
    }).catch((err) => { console.log(err.response) })
  }

  render () {
    const meteo = (<i className={`wi ${this.state.icon} wi-fw`} />)
    return (
      <div className='meteo'>
        <div className='partie1'>
          {meteo}
        </div>
        <div className='partie2'>
          <div className='result'>
            {this.state.location}
          </div>
          <div className='result'>
            {this.state.temp} °C
          </div>
          <div className='result1'>
            <div className='result11'><i href='../image/wi-sunset.svg' />{this.state.lever}<br />{this.state.coucher}</div>
            <div className='result11'>Min: {this.state.tempMin}°C<br />Max: {this.state.tempMax}°C</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Weather
