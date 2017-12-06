import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { local } from '../../utils/api.js'
import '../../css/contact.css'
import MyFancyComponent from '../../components/maps.js'

class Contact extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      telephone: '',
      sujet: '',
      message: ''
    }
    this.handleSend = this.handleSend.bind(this)
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSend () {
    if (this.state.name !== undefined && this.state.email !== undefined &&
      this.state.sujet !== undefined && this.state.message !== undefined) {
      local().put('/contact/message', {
        name: this.state.name,
        email: this.state.email,
        telephone: this.state.telephone,
        sujet: this.state.sujet,
        message: this.state.message
      }).then((res) => {
        console.log('message Send')
      }).catch((err) => { console.log(err.response) })
    }
  }

  render () {
    return (
      <div id='bodyContact'>
        <div className='FormContact'>
          <center>
            <h4><u>Adresse du site:</u></h4>
            <p>TOTEM WAKE PARK</p>
            <p>Chemin des sablons</p>
            <p>71680 crèche-sur-Saône</p>
            <p>Tel: 06 16 91 02 55</p>
          </center>
        </div>
        <div className='FormContact'>
          <center>
            <p className='title'>Formulaire de Contact</p>
          </center>
          <form>
            <FormGroup>
              <ControlLabel>Votre Nom *</ControlLabel>
              <FormControl id='formControlsText' type='text' name='name' value={this.state.name} placeholder='Name' onChange={this.handleChange.bind(this)} />
              <ControlLabel>Votre email *</ControlLabel>
              <FormControl id='formControlsText' type='mail' name='email' value={this.state.email} placeholder='exemple@gmail.com' onChange={this.handleChange.bind(this)} />
              <ControlLabel>Téléphone</ControlLabel>
              <FormControl id='formControlsText' type='number' name='telephone' value={this.state.telephone} placeholder='0606060606' onChange={this.handleChange.bind(this)} />
              <ControlLabel>Sujet *</ControlLabel>
              <FormControl id='formControlsText' type='text' name='sujet' value={this.state.sujet} placeholder='Sujet' onChange={this.handleChange.bind(this)} />
              <ControlLabel>Votre message *</ControlLabel>
              <FormControl id='resize' componentClass='textarea' type='text' name='message' value={this.state.message} placeholder='Message' onChange={this.handleChange.bind(this)} />
              <Button id='buttonContact' bsStyle='primary' bsSize='large' block>Envoyer</Button>
              <p>* Obligatoire</p>
            </FormGroup>
          </form>
        </div>
        <div className='FormContact'>
          <MyFancyComponent />
        </div>
      </div>
    )
  }
}

export default Contact
