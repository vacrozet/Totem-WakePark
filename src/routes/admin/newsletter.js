import React, { Component } from 'react'
import bcrypt from 'bcryptjs'
import { Button } from 'react-bootstrap'
import { local } from '../../utils/api.js'

class NewsLetter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allMail: []
    }
    this.handleDeleteMail = this.handleDeleteMail.bind(this)
    this.getAllMail = this.getAllMail.bind(this)
  }

  getAllMail () {
    local().get('/newsletter/mail').then((res) => {
      if (res.data.success === true) this.setState({allMail: res.data.result[0].mail})
    }).catch((err) => { console.log(err.response) })
  }
  componentWillMount () {
    if (global.localStorage.getItem('statut')) {
      let token = global.localStorage.getItem('statut')
      if (!bcrypt.compareSync('true', token)) {
        this.props.history.push('/')
      } else this.getAllMail()
    }
  }

  handleDeleteMail (mail) {
    if (mail !== undefined) {
      local().delete('/newsletter/mail', {
        params: {
          mail: mail
        }
      }).then((res) => {
        if (res.data.success === true) this.getAllMail()
      }).catch((err) => { console.log(err.response) })
    }
  }

  render () {
    return (
      <div>
        <center>
          <table>
            <tbody>
              <tr>
                <th>Mail</th>
                <th>inscris le</th>
                <th>Delete</th>
              </tr>
              {this.state.allMail ? this.state.allMail.map((res, index) => {
                return (
                  <tr key={index}>
                    <td>{res.mail}</td>
                    <td>{res.time}</td>
                    <td>
                      <Button name={res.mail} bsStyle='danger' onClick={() => this.handleDeleteMail(res.mail)}>
                        Supprimer Mail
                      </Button>
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

export default NewsLetter
