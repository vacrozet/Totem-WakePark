import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import { local } from '../utils/api.js'

class CCarousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      result: []
    }
  }
  componentWillMount () {
    local().get('/picture/carousel').then((res) => {
      if (res.data.success === true) {
        this.setState({
          result: res.data.result
        })
      }
    }).catch((err) => {
      console.log(err.response)
    })
  }

  // {this.state.result.map((res, index) => {
  //   return (
  //     <Carousel.Item>
  //       <img key={index} width={900} height={500} alt='900x500' src={`http://localhost:3005/pictures/${res.name}`} />
  //       <Carousel.Caption>
  //         <h3>{res.title}</h3>
  //         <p>{res.overview}</p>
  //       </Carousel.Caption>
  //     </Carousel.Item>
  //   )
  // })}
  render () {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img width={900} height={500} alt='900x500' src='../image/team_totem.jpg' />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt='900x500' src='../image/team_totem.jpg' />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt='900x500' src='../image/team_totem.jpg' />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt='900x500' src='../image/team_totem.jpg' />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt='900x500' src='../image/team_totem.jpg' />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt='900x500' src='../image/team_totem.jpg' />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        
        
        
        <Carousel>
          <Carousel.Item>
            <img width={900} height={500} alt='900x500' src='../image/team_totem.jpg' />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt='900x500' src='../image/team_totem.jpg' />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt='900x500' src='../image/team_totem.jpg' />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt='900x500' src='../image/team_totem.jpg' />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt='900x500' src='../image/team_totem.jpg' />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt='900x500' src='../image/team_totem.jpg' />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    )
  }
}

export default CCarousel
