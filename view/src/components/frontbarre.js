import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

class FrontBarre extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'accueil'
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }
  handleItemClick (e, { name }) {
    this.setState({
      activeItem: name
    })
    this.props.history.push(`/${name}`)
  }
  render () {
    const {activeItem} = this.state
    return (
      <div>
        <Menu stackable>
          <Menu.Item
            name='accueil'
            active={activeItem === 'accueil'}
            content='Accueil'
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='presentation'
            active={activeItem === 'presentation'}
            content='Presentation'
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='tarifs'
            active={activeItem === 'tarifs'}
            content='Les Tarifs'
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='snack'
            active={activeItem === 'snack'}
            content='Snack'
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='agendahoraire'
            active={activeItem === 'agendahoraire'}
            content='Horaires & Agenda'
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='galeries'
            active={activeItem === 'galeries'}
            content='Galeries'
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='contact'
            active={activeItem === 'contact'}
            content='Contact'
            onClick={this.handleItemClick}
          />
        </Menu>
      </div>
    )
  }
}

export default FrontBarre
