import React, { Component } from 'react'
import bcrypt from 'bcryptjs'
import { FormGroup, FormControl, Button, Modal } from 'react-bootstrap'
import { local } from '../../utils/api.js'
import '../../css/user.css'
import generator from 'generate-password'

class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newUser: '',
      showModalCreate: false,
      password: '',
      allUser: []
    }
    this.handleCreateUser = this.handleCreateUser.bind(this)
    this.handleChangeSU = this.handleChangeSU.bind(this)
    this.getAllUser = this.getAllUser.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
  }

  getAllUser () {
    local().get('/user/all').then((res) => {
      if (res.data.success === true) this.setState({allUser: res.data.result})
    }).catch((err) => { console.log(err.response) })
  }
  componentWillMount () {
    if (global.localStorage.getItem('totem') !== '') this.setState({connexion: true})
    if (global.localStorage.getItem('statut')) {
      let token = global.localStorage.getItem('statut')
      if (!bcrypt.compareSync('true', token)) {
        this.props.history.push('/')
      } else {
        this.getAllUser()
        let pass = generator.generate({length: 5, numbers: true})
        this.setState({password: pass})
      }
    }
  }
  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleformulaire () {
    return (
      <div id='formulaire'>
        <h1>Créer un nouvel User</h1>
        <FormGroup bsSize='small'>
          <FormControl
            className='inputform'
            name='newUser'
            type='text'
            placeholder='Ajouter un User'
            value={this.state.newUser}
            onChange={this.handleChange.bind(this)}
          />
          {' '}
          {this.state.newUser.trim() !== '' ? (
            <Button
              className='buttonform'
              bsStyle='primary'
              name='submit'
              onClick={() => this.setState({ showModalCreate: true })}
            >
              Créer
          </Button>
          ) : (
            <Button
              className='buttonform'
              bsStyle='primary'
              name='submit'
              disabled
              onClick={() => this.setState({ showModalCreate: true })}
            >
              Créer
          </Button>
          )}
        </FormGroup>
      </div>
    )
  }
  handleModalCreateUser () {
    return (
      <Modal show={this.state.showModalCreate} onHide={() => this.setState({ showModalCreate: false })}>
        <Modal.Header closeButton>
          <Modal.Title>Créer Utilisateur ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Login -> "{this.state.newUser}"</p>
          <p>Password -> "{this.state.password}"</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.setState({showModalCreate: false})}>Non</Button>
          <Button bsStyle='primary' onClick={this.handleCreateUser}>Oui</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  handleCreateUser () {
    if (this.state.login !== '' || this.state.password !== '') {
      local().put('/user/add', {
        login: this.state.newUser,
        password: this.state.password
      }).then((res) => {
        if (res.data.success === true) {
          this.props.notification.addNotification({
            message: res.data.message,
            level: 'success'
          })
          this.getAllUser()
          let pass = generator.generate({length: 5, numbers: true})
          this.setState({password: pass})
        } else {
          this.props.notification.addNotification({
            message: res.data.message,
            level: 'error'
          })
        }
        this.setState({showModalCreate: false, newUser: ''})
      }).catch((err) => { console.log(err.response) })
    } else this.setState({ showModalCreate: false })
  }
  handleChangeSU (login, bool) {
    local().patch('/user/superuser', {
      login: login,
      superUser: bool
    }).then((res) => {
      if (res.data.success === true) {
        this.getAllUser()
        this.props.notification.addNotification({
          message: res.data.message,
          level: 'success'
        })
      }
    }).catch((err) => { console.log(err.response) })
  }
  handleDeleteUser (id) {
    local().delete('user/delete', {params: {id: id}}).then((res) => {
      if (res.data.success === true) {
        this.getAllUser()
        this.props.notification.addNotification({
          message: res.data.message,
          level: 'success'
        })
      }
    }).catch((err) => { console.log(err.response) })
  }
  render () {
    return (
      <div>
        {this.handleformulaire()}
        {this.handleModalCreateUser()}
        <center>
          <h1>Liste des Users</h1>
        </center>
        <center>
          <table>
            <tbody>
              <tr>
                <th>Login</th>
                <th>Dernière Connexion</th>
                <th>SuperAdmin</th>
                <th>Delete</th>
              </tr>
              {this.state.allUser ? this.state.allUser.map((res, index) => {
                return (
                  <tr key={index}>
                    <td>{res.login}</td>
                    <td>{res.lastConnexion}</td>
                    <td> {res.superUser ? (
                      <Button name={res.login} bsStyle='danger' onClick={() => this.handleChangeSU(res.login, false)}>
                        Enlever le SuperUser
                      </Button>
                    ) : (
                      <Button name={res.login} bsStyle='primary' onClick={() => this.handleChangeSU(res.login, true)}>
                        Passer en SuperUser
                      </Button>
                    )}
                    </td>
                    <td>{res.superUser ? (
                      <Button name={res.login} bsStyle='danger' disabled>
                        Supprimer User
                      </Button>
                    ) : (
                      <Button name={res.login} bsStyle='danger' onClick={() => this.handleDeleteUser(res._id)}>
                        Supprimer User
                      </Button>
                    )}
                    </td>
                  </tr>
                )
              }) : (null)}
            </tbody>
          </table>
        </center>
      </div>
    )
  }
}

export default Users
