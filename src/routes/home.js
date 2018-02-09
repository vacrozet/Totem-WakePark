import React, { Component } from 'react'
import Newsletter from './user/newsletter.js'
import Weather from '../components/weather.js'
import News from '../components/news.js'
import '../css/home.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className='bodyHome'>
        <div id='parallaxe1'>
          <div className='title'>
            <div className='text'>TOTEM </div>
            <div className='text'>&nbsp;WAKE PARK</div>
          </div>
        </div>
        <div className='div1'>
          <div className='text'>
            <div className='title'>Sensation Garanties</div>
            <div className='title2'>Totem Wake-park</div>
            <div className='paragraphe'>
              Le Totem Wake-park (téléski nautique du Mâconnais-Beaujolais) est un « câble » Rixen 5 poulies équipé d’un wake park constitué de modules (obstacles).
              Le wake park est destiné aux utilisateurs expérimentés et équipés de matériels adaptés.
            </div>
          </div>
        </div>
        <div id='parallaxe2'>&nbsp;</div>
        <div className='div2'>
          <div className='homeComponent'>
            <Weather />
          </div>
          <div className='homeComponent'>
            <News />
          </div>
        </div>
        <div id='parallaxe3'>&nbsp;</div>
        <Newsletter />
      </div>
    )
  }
}

export default Home
  // <div className='home'>
  //   <div className='homeComponent'>
  //     <Weather />
  //   </div>
  //   <div className='homeComponent'>
  //     <News />
  //   </div>
  //   <div id='parallaxe1'>Wakeboard Crêche-Sur-Saône</div>

  //   <div className='new'>
  //     <Newsletter notification={this.props.notification} />
  //   </div>
  // </div>
