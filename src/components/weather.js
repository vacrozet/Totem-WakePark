import React, { Component } from 'react'
import { local } from '../utils/api.js'
import '../css/weather.css'

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
        this.setState({
          location: res.data.result.name,
          temp: res.data.result.main.temp - 273.15,
          icon: `http://openweathermap.org/img/w/${res.data.result.weather[0].icon}.png`
        })
      }
    }).catch((err) => { console.log(err.response) })
  }

  render () {
    const meteo = (<i className='wi wi-day-sunny' />)
    return (
      <div className='meteo' style={{backgroundImage: 'url(' + this.state.icon + ')'}}>
        <div className='info'>
          {meteo}
          <div className='result'>
            {this.state.location}
          </div>
          <div className='result'>
            {this.state.temp} °C
          </div>
        </div>
      </div>
    )
  }
}

export default Weather
