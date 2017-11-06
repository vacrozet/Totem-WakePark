import React, { Component } from 'react'
import axios from 'axios'
import { GenericWeather } from 'react-weather'

class Accueil extends Component {
  constructor (props) {
    super(props)
    this.state = {
      city: '',
      temp_c: '',
      condition: ''
    }
  }

  componentWillMount () {
    axios.get('http://api.apixu.com/v1/current.json?key=60a98d92084e415eb0e162324170611&q=46.237192,4.805336').then((res) => {
      console.log(res.data)
      console.log(res.data.location.name)
      this.setState({
        city: res.data.location.name,
        temp_c: res.data.current.temp_c,
        condition: res.data.current.condition.text
      })
      setTimeout(() => {
        console.log(this.state.city)
      }, 1000)
    }).catch((err) => {
      console.log(err.response)
    })
  }

  render () {
    return (
      <div>
          <GenericWeather city={this.state.city} temp={this.state.temp_c} status={this.state.condition} />
      </div>
    )
  }
}

export default Accueil
