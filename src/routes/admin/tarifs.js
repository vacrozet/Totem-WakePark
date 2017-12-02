import React, { Component } from 'react'
import { Button, FormGroup, FormControl, Modal } from 'react-bootstrap'
import { local } from '../../utils/api.js'

class DocumentInput extends React.Component {
  render () {
    return <input
      type='file'
      name={`document-${this.props.index}-document`} 
    />
  }
}

class ChangeTarifs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModalCreaGamm: false,
      creaGamm: '',
      documents: []
    }
    this.add = this.add.bind(this)
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

  add () {
    const documents = this.state.documents.concat(DocumentInput)
    this.setState({ documents })
  }
  render () {
    const documents = this.state.documents.map((Element, index) => {
      return (
        <div>
          <input key={index} index={index} />
          <input key={index} index={index} />
          <input key={index} index={index} />
        </div>
      )
    })
    return (
      <div>
        {this.handleFormCreaGamm()}
        {this.handleShowModalCreaGamm()}
        <button onClick={this.add}>Add</button>
        <div className='inputs'>
          { documents }
        </div>
      </div>
    )
  }
}
export default ChangeTarifs
