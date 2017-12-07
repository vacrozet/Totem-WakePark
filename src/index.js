import './index.css'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import Frontbarre from './components/navbar.js'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './routes/home'
import Galerie from './routes/user/galerie'
import Tarifs from './routes/user/tarifs.js'
import Contact from './routes/user/contact.js'

import Upload from './routes/admin/upload.js'
import ChangeTarifs from './routes/admin/tarifs.js'
import Users from './routes/admin/users.js'

class Index extends Component {
  render () {
    return (
      <div>
        <Frontbarre id='navbar' history={this.props.history} match={this.props.match} location={this.props.location} />
        <Switch>
          <Route exact path='/galerie/change' component={Upload} />
          <Route exact path='/galerie' component={Galerie} />
          <Route exact path='/tarifs/change' component={ChangeTarifs} />
          <Route exact path='/tarifs' component={Tarifs} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/user' component={Users} />
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Route component={Index} />
  </BrowserRouter>, document.getElementById('root'))
registerServiceWorker()
