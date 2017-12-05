import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { local } from '../../utils/api.js'

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
      <div>
        <center>
          <h1>Formulaire de Contact</h1>
        </center>
        <FormGroup>
          <ControlLabel>Votre Nom (obligatoire)*</ControlLabel>
          <FormControl id='formControlsText' type='text' name='name' value={this.state.name} placeholder='Name' onChange={this.handleChange.bind(this)} />
          <ControlLabel>Votre email (obligatoire)*</ControlLabel>
          <FormControl id='formControlsText' type='mail' name='email' value={this.state.email} placeholder='exemple@gmail.com' onChange={this.handleChange.bind(this)} />
          <ControlLabel>Téléphone</ControlLabel>
          <FormControl id='formControlsText' type='number' name='telephone' value={this.state.telephone} placeholder='0606060606' onChange={this.handleChange.bind(this)} />
          <ControlLabel>Sujet (obligatoire)*</ControlLabel>
          <FormControl id='formControlsText' type='text' name='sujet' value={this.state.sujet} placeholder='Sujet' onChange={this.handleChange.bind(this)} />
          <ControlLabel>Votre message (obligatoire)*</ControlLabel>
          <FormControl componentClass='textarea' type='text' name='message' value={this.state.message} placeholder='Message' onChange={this.handleChange.bind(this)} />
        </FormGroup>
      </div>
    )
  }
}

export default Contact
