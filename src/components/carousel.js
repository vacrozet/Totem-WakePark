import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import '../css/carousel.css'
// import { local } from '../utils/api.js'

class CCarousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      result: []
    }
  }
  componentWillMount () {
  }

  render () {
    return (
      <div>
        {this.props.name ? (
          <div>
            <h1>{this.props.name}</h1>
          </div>
        ) : (
          null
        )}
        {this.props.arrayPic ? (
          <Carousel>
            {this.props.arrayPic ? (this.props.arrayPic.map((pic, index) => {
              return (
                <Carousel.Item key={index} id='PictCarousel'>
                  <img id='Pict' width={900} height={500} alt='900x500' src={`http://localhost:3005/picture/getpicture/carousel/${pic.dir}${pic.path}/${pic.type}`} />
                  <Carousel.Caption>
                    {/* <h3>{this.props.name}</h3> */}
                    <p>{pic.comment}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              )
            })
            ) : (
              null
            )}
          </Carousel>
        ) : (
          null
        )}
      </div>
    )
  }
}

export default CCarousel
