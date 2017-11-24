import './index.css'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import Frontbarre from './components/navbar.js'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './routes/home'

class Index extends Component {
  render () {
    return (
      <div>
        <Frontbarre id='navbar' history={this.props.history} match={this.props.match} location={this.props.location} />
        <Switch>
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
