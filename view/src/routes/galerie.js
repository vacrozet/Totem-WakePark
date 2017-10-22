import React, { Component } from 'react'
import { Embed } from 'semantic-ui-react'

class Galerie extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div>
        <Embed
          id='O6Xo21L0ybE'
          placeholder='/assets/images/image-16by9.png'
          url='https://www.facebook.com/123485067753806/videos/1051346661634304/'
        />
        <Embed
          id='97857688'
          placeholder='./test.png'
          source='vimeo'
        />
      </div>
    )
  }
}

export default Galerie
