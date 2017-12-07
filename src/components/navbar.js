import React, { Component } from 'react'
import { ControlLabel, FormGroup, FormControl, Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Modal, Button } from 'react-bootstrap'
import '../App.css'
import { Link } from 'react-router-dom'
import { local } from '../utils/api.js'
import bcrypt from 'bcryptjs'

class Frontbarre extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      login: '',
      password: '',
      connexion: false,
      superUser: false
    }
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleConnexion = this.handleConnexion.bind(this)
  }

  handleChangePage (page) {
    this.props.history.push(page)
  }
  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleConnexion () {
    if (this.state.login !== undefined || this.state.password !== undefined) {
      local().get('/user/signin', {
        params: {
          login: this.state.login,
          passwd: this.state.password
        }
      }).then((res) => {
        if (res.data.success === true) {
          this.setState({
            show: false,
            connexion: true,
            login: '',
            password: '',
            superUser: res.data.superUser
          })
          global.localStorage.setItem('totem', res.data.token)
          if (res.data.superUser === true) {
            global.localStorage.setItem('statut', bcrypt.hashSync('true', 10))
          } else {
            global.localStorage.setItem('statut', bcrypt.hashSync('false', 10))
          }
        } else {
          console.log(res.data.message)
        }
      }).catch((err) => { console.log(err.response) })
    }
  }

  handleLogOut () {
    this.setState({
      connexion: false,
      superUser: false
    })
    global.localStorage.removeItem('totem')
    global.localStorage.removeItem('statut')
    this.props.history.push('/')
  }

  componentWillMount () {
    if (global.localStorage.getItem('totem') !== '') {
      this.setState({connexion: true})
    }
    if (global.localStorage.getItem('statut')) {
      let token = global.localStorage.getItem('statut')
      if (bcrypt.compareSync('true', token)) {
        this.setState({superUser: true})
      } else {
        this.setState({superUser: false})
      }
    }
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
          <FormControl name='password' type='password' placeholder='Password' value={this.state.writeComment} onChange={this.handleChange.bind(this)} />
        </FormGroup>
        <Modal.Footer>
          <Button onClick={() => this.setState({show: false})}>Close</Button>
          <Button bsStyle='primary' onClick={this.handleConnexion}>Connexion</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  render () {
    const SuperUser = this.state.superUser
    const Connexion = this.state.connexion

    let result = null
    if (SuperUser === true && Connexion === true) {
      result = <NavDropdown eventKey={5} title='Reglages' id='basic-nav-dropdown'>
        <MenuItem eventKey={5.1} onClick={() => this.handleChangePage('/galerie/change')}><Glyphicon glyph='picture' /> Add Picture</MenuItem>
        <MenuItem eventKey={5.2}><Glyphicon glyph='user' /> Add User</MenuItem>
        <MenuItem eventKey={5.3}><Glyphicon glyph='user' /> Gérer</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={5.3} onClick={this.handleLogOut.bind(this)}><Glyphicon glyph='cog' /> Deconnexion</MenuItem>
      </NavDropdown>
    } else if (Connexion === true) {
      result = <NavDropdown eventKey={5} title='Reglages' id='basic-nav-dropdown'>
        <MenuItem eventKey={5.1} onClick={() => this.handleChangePage('/galerie/change')}><Glyphicon glyph='picture' /> Add Picture</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={5.3} onClick={this.handleLogOut.bind(this)}><Glyphicon glyph='cog' /> Deconnexion</MenuItem>
      </NavDropdown>
    } else {
      result = <NavDropdown eventKey={5} title='Reglages' id='basic-nav-dropdown'>
        <MenuItem eventKey={5.3} onClick={() => this.setState({show: true})}><Glyphicon glyph='cog' /> Settings</MenuItem>
      </NavDropdown>
    }
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
              {result}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Frontbarre
