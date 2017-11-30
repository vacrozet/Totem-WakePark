import React, { Component } from 'react'
import CCarousel from '../components/carousel.js'
import { local } from '../utils/api'

class Galerie extends Component {
  constructor (props) {
    super(props)
    this.state = {
      result: []
    }
  }

  componentWillMount () {
    local().get('/picture/all').then((res) => {
      if (res.data.success === true) {
        this.setState({
          result: res.data.result
        }, () => {
          var maj = this.state.result
          maj.sort((a, b) => {
            var sortvalue
            if (a.time < b.time) {
              sortvalue = -1
            }
            if (a.time === b.time) {
              sortvalue = 0
            }
            if (a.time > b.time) {
              sortvalue = 1
            }
            return sortvalue
          })
          this.setState({
            result: maj
          })
        })
      }
    }).catch((err) => { console.log(err.response) })
  }

  render () {
    return (
      <div>
        {this.state.result ? this.state.result.map((res, index) => {
          return (<CCarousel key={index} name={res._id} arrayPic={res.pictures} />)
        }) : (
          <div> null </div>
        )}
      </div>
    )
  }
}

export default Galerie
