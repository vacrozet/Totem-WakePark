import React, { Component } from 'react'
import { Button, FormGroup, FormControl, Modal } from 'react-bootstrap'
import { local } from '../../utils/api.js'

class ChangeTarifs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModalCreaGamm: false,
      creaGamm: ''
    }
  }

  componentWillMount () {
    local().get('/tarifs/gamme').then((res) => {
      console.log(res)
    }).catch((err) => { console.log(err.response) })
  }
  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleFormCreaGamm () {
    return (
      <div id='formulaire'>
        <h1>Créer une nouvelle gamme de tarifs</h1>
        <FormGroup bsSize='small'>
          <FormControl
            className='inputform'
            name='creaGamm'
            type='text'
            placeholder='Nouvelle Gamme'
            value={this.state.creaGamm}
            onChange={this.handleChange.bind(this)}
          />
          {' '}
          {this.state.creaGamm.trim() !== '' ? (
            <Button
              className='buttonform'
              bsStyle='primary'
              name='submit'
              onClick={() => this.setState({ showModalCreaGamm: true })}
            >
              Créer
          </Button>
          ) : (
            <Button
              className='buttonform'
              bsStyle='primary'
              name='submit'
              disabled
            >
              Créer
          </Button>
          )}
        </FormGroup>
      </div>
    )
  }
  handleShowModalCreaGamm () {
    return (
      <Modal show={this.state.showModalCreaGamm} onHide={() => this.setState({ showModalCreaGamm: false })}>
        <Modal.Header closeButton>
          <Modal.Title>Êtes-vous sur du nom ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>{this.state.creaGamm}</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.setState({showModalCreaGamm: false})}>Non</Button>
          <Button bsStyle='primary' onClick={this.handleCreateGamm.bind(this)}>Oui</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  handleCreateGamm () {
    if (this.state.creaGamm.trim() !== '') {
      local().put('/tarifs/gamme')
    }
  }

  handleSelectGamm () {
  }

  render () {
    return (
      <div>
        {this.handleFormCreaGamm()}
        {this.handleShowModalCreaGamm()}
      </div>
    )
  }
}

export default ChangeTarifs
