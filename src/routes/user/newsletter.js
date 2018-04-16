import React, { Component } from 'react'
import { FormControl, Button } from 'react-bootstrap'
import { local } from '../../utils/api.js'
import '../../css/newsletter.css'

class Newsletter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mail: ''
    }
    this.handleAddNewsletter = this.handleAddNewsletter.bind(this)
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleAddNewsletter (evt) {
    if (evt.key === 'Enter' || evt.target.value === 'submit') {
      if (this.state.mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        local().put('/newsletter/add', {
          mail: this.state.mail
        }).then((res) => {
          if (res.data.success === true) {
            console.log(res.data)
            this.props.noti.addNotification({
              level: 'success',
              message: res.data.message
            })
            this.setState({mail: ''})
          } else {
            this.props.noti.addNotification({
              level: 'error',
              message: 'vous êtes déjà abonné'
            })
            this.setState({mail: ''})
          }
        })
      } else {
        this.props.noti.addNotification({
          level: 'error',
          message: 'champs mail renseigné'
        })
        this.setState({mail: ''})
      }
    }
  }

  render () {
    return (
      <div>
        <center>
          <h3>Abonne-toi à la NewsLetter</h3>
        </center>
        <form className='newsletter'>
          <div className='content'>
            <FormControl
              bsSize='large'
              className='inputform'
              name='mail'
              type='mail'
              placeholder='exemple@exemple.fr'
              value={this.state.mail}
              onKeyPress={this.handleAddNewsletter}
              onChange={this.handleChange.bind(this)}
            />
            {this.state.mail.trim() !== '' ? (
              <Button
                bsSize='large'
                bsStyle='primary'
                value='submit'
                onClick={this.handleAddNewsletter}
                >
                S'abonner
              </Button>
            ) : (
              <Button
                bsSize='large'
                bsStyle='primary'
                value='submit'
                disabled
              >
                S'abonner
              </Button>
            )}
          </div>
        </form>
      </div>
    )
  }
}

export default Newsletter
