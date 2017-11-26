import './index.css'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import Frontbarre from './components/navbar.js'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route, Switch } from 'react-router-dom' //, Redirect
import Home from './routes/home'
import Galerie from './routes/galerie'
import Upload from './routes/upload.js'

class Index extends Component {
  render () {
    return (
      <div>
        <Frontbarre id='navbar' history={this.props.history} match={this.props.match} location={this.props.location} />
        <Switch>
          <Route exact path='/upload' component={Upload} />
          <Route exact path='/galerie' component={Galerie} />
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
