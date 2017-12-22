import React, { Component } from 'react'
import bcrypt from 'bcryptjs'
import Dropzone from 'react-dropzone'
import { local } from '../../utils/api.js'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

class News extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      type: ['INFO IMPORTANTE', 'SOIRÉE', 'PROMOTION'],
      text: ''
    }
  }

  componentWillMount () {
    if (global.localStorage.getItem('totem')) this.setState({connexion: true})
    if (global.localStorage.getItem('statut')) {
      let token = global.localStorage.getItem('statut')
      if (!bcrypt.compareSync('true', token)) {
        this.props.history.push('/')
      }
    }
  }
  onDrop (acceptedFiles, rejectedFiles) {
    acceptedFiles.forEach(file => {
      let type
      if (file.type === 'image/jpeg') {
        type = '.jpg'
      } else {
        type = '.png'
      }
      var reader = new global.FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        local().put('/picture/picture', {
          pic: reader.result,
          name: file.name,
          type: type,
          dirName: this.state.dirName
        }).then((res) => {
          if (res.data.success === true) {
            this.props.notification.addNotification({
              message: res.data.message,
              level: 'success'
            })
            this.setState({isLoading: false})
            local().get('/picture/album', {
              params: {
                dir: this.state.dirName
              }
            }).then((res1) => {
              if (res1.data.success === true) {
                this.setState({
                  album: res1.data.result[0].pictures,
                  albumName: res1.data.result[0]._id
                })
              }
              this.setState({ isLoading: false })
            }).catch((err) => { console.log(err.response) })
          }
        }).catch((err) => {
          if (err.response) console.log(err.response.data.error)
        })
      }
      reader.onerror = function (error) {
        console.log('Error when reading image: ', error)
      }
    })
    if (rejectedFiles.length !== 0) {
      console.log('This file is not allowed please use png < 1mb, error')
    }
  }
  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render () {
    return (
      <div>
        coucou
      </div>
    )
  }
}

export default News
