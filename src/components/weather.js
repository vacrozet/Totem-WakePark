import React, { Component } from 'react'
import { local } from '../utils/api.js'

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
        coucou
      </div>
    )
  }
}

export default Weather
