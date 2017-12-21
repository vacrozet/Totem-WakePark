import React, { Component } from 'react'
import { local } from '../utils/api.js'
import '../css/news.css'

class News extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      linkBackground: '',
      text: ''
    }
  }

  componentWillMount () {
    local().get('/tasks/news').then((res) => {
      if (res.data.success === true) {
        this.setState({
          title: res.data.result.title,
          linkBackground: res.data.result.linkBackground,
          text: res.data.result.text
        })
      }
    }).catch((err) => {
      console.log(err.response)
    })
  }

  render () {
    return (
      <div className='bodyNews' >
        <div className='fisrtPartie' >
          <center>{this.state.title}</center>
        </div>
        <div className='secondPartie' >
          {this.state.text}
        </div>
      </div>
    )
  }
}

export default News
