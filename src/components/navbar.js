import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import '../App.css'
import { Link } from 'react-router-dom'

class Frontbarre extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.handleChangePage = this.handleChangePage.bind(this)
  }

  handleChangePage (page) {
    this.props.history.push(page)
  }
  render () {
    return (
      <div id='frontbarre'>
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
              <NavItem eventKey={2} onClick={() => this.handleChangePage('galerie')}>Galerie</NavItem>
              <NavItem eventKey={3} onClick={() => this.handleChangePage('tarifs')}>Tarifs</NavItem>
              <NavItem eventKey={4} onClick={() => this.handleChangePage('galerie')}>services</NavItem>
              <NavDropdown eventKey={5} title='Dropdown' id='basic-nav-dropdown'>
                <MenuItem eventKey={5.1}>Action</MenuItem>
                <MenuItem eventKey={5.2}>Another action</MenuItem>
                <MenuItem eventKey={5.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={5.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Frontbarre
