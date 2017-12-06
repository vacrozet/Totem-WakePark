import React, { Component } from 'react'
import { ControlLabel, FormGroup, FormControl, Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Modal, Button } from 'react-bootstrap'
import '../App.css'
import { Link } from 'react-router-dom'

class Frontbarre extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: true,
      login: '',
      password: ''
    }
    this.handleChangePage = this.handleChangePage.bind(this)
  }

  handleChangePage (page) {
    this.props.history.push(page)
  }
  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleModalConnexion () {
    return (
      <Modal
        show={this.state.show}
        onHide={() => this.setState({show: false})}
        container={this}
        aria-labelledby='contained-modal-title'
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title'>Connexion</Modal.Title>
        </Modal.Header>
        <FormGroup>
          <ControlLabel>Login</ControlLabel>
          <FormControl name='login' type='text' placeholder='Login' value={this.state.writeComment} onChange={this.handleChange.bind(this)} />
          <ControlLabel>Password</ControlLabel>
          <FormControl name='password' type='text' placeholder='Password' value={this.state.writeComment} onChange={this.handleChange.bind(this)} />
        </FormGroup>
        <Modal.Footer>
          <Button onClick={() => this.setState({show: false})}>Close</Button>
          <Button bsStyle='primary' onClick={() => this.setState({show: false})}>Connexion</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  render () {
    return (
      <div id='frontbarre'>
        {this.handleModalConnexion()}
        <Navbar inverse collapseOnSelect className='navbar'>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Totem Wake Park</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} onClick={() => this.handleChangePage('')}>Accueil</NavItem>
              <NavItem eventKey={2} onClick={() => this.handleChangePage('/galerie')}>Galerie</NavItem>
              <NavItem eventKey={3} onClick={() => this.handleChangePage('/tarifs')}>Tarifs</NavItem>
              <NavItem eventKey={4} onClick={() => this.handleChangePage('/contact')}>Contact</NavItem>
              <NavDropdown eventKey={5} title='Dropdown' id='basic-nav-dropdown'>
                <MenuItem eventKey={5.1}>Action</MenuItem>
                <MenuItem eventKey={5.2}>Another action</MenuItem>
                <MenuItem eventKey={5.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={5.3} onClick={() => this.setState({show: true})}><Glyphicon glyph='cog' /> Settings</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Frontbarre
