import React, { Component } from 'react'
import Newsletter from './user/newsletter.js'
import Weather from '../components/weather.js'
import '../css/home.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  // <div className='gridHome'>
  //   coucou
  // </div>
  render () {
    return (
      <div className='test'>
        <div className='bodyHome'>
          <div className='homeComponent'>
            <Weather />
          </div>
          <div className='homeComponent'>
            <Weather />
          </div>
          <div className='homeComponent'>
            <Weather />
          </div>
          <div className='new'>
            <Newsletter notification={this.props.notification} />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
