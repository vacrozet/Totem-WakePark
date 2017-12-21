import React, { Component } from 'react'
import bcrypt from 'bcryptjs'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

class News extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  componentWillMount () {
    if (global.localStorage.getItem('totem')) this.setState({connexion: true})
    if (global.localStorage.getItem('statut')) {
      let token = global.localStorage.getItem('statut')
      if (!bcrypt.compareSync('true', token)) {
        this.props.history.push('/')
      }
    }
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render () {
    return (
      <div>
        <div id='formulaire'>
          <h1>Créer une Actu</h1>
          <FormGroup bsSize='small'>
            <FormControl
              className='inputform'
              name='name'
              type='text'
              placeholder='evenement'
              value={this.state.createDir}
              onChange={this.handleChange.bind(this)}
            />
            {' '}
            {this.state.name.trim() !== '' ? (
              <Button
                className='buttonform'
                bsStyle='primary'
                name='submit'
                onClick={() => this.setState({ showModal: true })}
              >
                Créer
            </Button>
            ) : (
              <Button
                className='buttonform'
                bsStyle='primary'
                name='submit'
                disabled
                onClick={() => this.setState({ showModal: true })}
              >
                Créer
            </Button>
            )}
          </FormGroup>
        </div>
      </div>
    )
  }
}

export default News
