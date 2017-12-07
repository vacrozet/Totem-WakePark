import React, { Component } from 'react'
import bcrypt from 'bcryptjs'
import { local } from '../../utils/api.js'

class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    if (global.localStorage.getItem('totem') !== '') {
      this.setState({connexion: true})
    }
    if (global.localStorage.getItem('statut')) {
      let token = global.localStorage.getItem('statut')
      if (!bcrypt.compareSync('true', token)) {
        this.props.history.push('/')
      } else {
        local().get('/user/all').then((res) => {
          console.log(res)
        }).catch((err) => { console.log(err.response) })
      }
    }
  }

  render () {
    return (
      <div>
        coucou
      </div>
    )
  }
}

export default Users
