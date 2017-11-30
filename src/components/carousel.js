import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import React, { Component } from 'react'
import '../css/carousel.css'

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
            <center>
              <p className='textTitleCarousel'>{this.props.name}</p>
            </center>
          </div>
        ) : (
          null
        )}
        {this.props.arrayPic ? (
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            swipeScrollTolerance={50}>
            {this.props.arrayPic ? (this.props.arrayPic.map((pic, index) => {
              return (
                <div key={index} className='divPict' >
                  <img className='Pict' alt='' src={`http://localhost:3005/picture/getpicture/carousel/${pic.dir}${pic.path}/${pic.type}`} />
                  <p className='legend legende' >{pic.comment}</p>
                </div>
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
