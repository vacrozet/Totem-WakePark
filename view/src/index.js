import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import FrontBarre from './components/frontbarre.js'
import Presentation from './routes/presentation.js'
import Accueil from './routes/accueil.js'
import Galerie from './routes/galerie.js'
class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div>
        <FrontBarre history={this.props.history} />
        <Switch>
          <Route exact path='/presentation' render={({history, match, location}) =>
            <Presentation history={history} match={match} location={location} />
          } />
          <Route exact path='/galeries' render={({history, match, location}) =>
            <Galerie history={history} match={match} location={location} />
          } />
          <Route path='/' component={Accueil} />
        </Switch>
      </div>
    )
  }
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/' component={Index} />
    </Switch>
  </Router>, document.getElementById('root')
)
registerServiceWorker()
