import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FrontBarre from './components/frontbarre.js'
import Presentation from './routes/presentation.js'
import Accueil from './routes/accueil.js'

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
          <Route path='/' component={Accueil} />
        </Switch>
      </div>
    )
  }
}

ReactDOM.render(
  <Router>
    <MuiThemeProvider>
      <Switch>
        <Route path='/' component={Index} />
      </Switch>
    </MuiThemeProvider>
  </Router>, document.getElementById('root')
)
registerServiceWorker()
