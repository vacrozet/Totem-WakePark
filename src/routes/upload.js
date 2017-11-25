import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { ButtonToolbar, Button } from 'react-bootstrap'
import { local } from '../utils/api.js'

class Upload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      upload: false
    }
  }
  
  // componentWillMount () {
  //   if (global.localStorage.getItem('token') !== '123456789') {
  //     this.props.history.push('/')
  //   }
  // }
  onDrop (acceptedFiles, rejectedFiles) {
    console.log(acceptedFiles)
    console.log(rejectedFiles)
    // let self = this
    acceptedFiles.forEach(file => {
      var reader = new global.FileReader()
      console.log(reader)
      reader.readAsDataURL(file)
      reader.onload = function () {
        local().put('/picture/upload', {
          pic: reader.result
        }).then((res) => {
          if (res.data.success === true) return console.log('success')
        }).catch((err) => {
          if (err.response) {
            // store.addNotif(err.response.data.error, 'error')
          }
        })
      }
      reader.onerror = function (error) {
        console.log('Error when reading image: ', error)
      }
    })
    if (rejectedFiles.length !== 0) {
      // store.addNotif('This file is not allowed please use png < 1mb', 'error')
    } 
  }
  
  render () {
    return (
      <div>
        <Dropzone
        disablePreview
        accept='image/png'
        maxSize={1000000}
        onDrop={this.onDrop.bind(this)}>
        {this.state.upload ? (
          <div>
            <ButtonToolbar>
              <Button bsSize="large">Large button</Button>
            </ButtonToolbar>
            </div>
          ) : (
            <div>
            <ButtonToolbar>
              <Button bsStyle="primary" bsSize="large">Large button</Button>
            </ButtonToolbar>
          </div>
        )}
        </Dropzone>
      </div>
    )
  }
}

export default Upload
