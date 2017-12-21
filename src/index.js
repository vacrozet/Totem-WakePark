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
import NewsLetter from './routes/admin/newsletter.js'
import News from './routes/admin/news.js'

var NotificationSystem = require('react-notification-system')

class Index extends Component {
  constructor (props) {
    super(props)
    this._notificationSystem = null
    this.state = {
      _notificationSystem: false
    }
  }
  componentDidMount () {
    this._notificationSystem = this.refs.notificationSystem
    this.setState({upNotifSys: true})
  }

  render () {
    return (
      <div>
        <NotificationSystem ref='notificationSystem' />
        {(this.state.upNotifSys !== false) ? (
          <Frontbarre id='navbar'
            history={this.props.history}
            match={this.props.match}
            location={this.props.location}
            notification={this._notificationSystem}
            />
        ) : (
          null
        )}
        <Switch>
          <Route exact path='/galerie/change' render={({history, match, location}) =>
            <Upload history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/galerie' render={({history, match, location}) =>
            <Galerie history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/tarifs/change' render={({history, match, location}) =>
            <ChangeTarifs history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/tarifs' render={({history, match, location}) =>
            <Tarifs history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/contact' render={({history, match, location}) =>
            <Contact history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/user' render={({history, match, location}) =>
            <Users history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/newsletter' render={({ history, match, location }) =>
            <NewsLetter history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/change/news' render={({history, match, location}) =>
            <News history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route path='/' render={({ history, match, location }) =>
            <Home history={history} match={match} notification={this._notificationSystem} />
          } />
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
