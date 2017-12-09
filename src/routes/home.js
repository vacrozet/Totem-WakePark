import React, { Component } from 'react'
import Newsletter from './user/newsletter.js'
import '../css/home.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div>
        <div className='new'>
          <Newsletter notification={this.props.notification} />
        </div>
      </div>
    )
  }
}

export default Home
