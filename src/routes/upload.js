import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Button, FormGroup, FormControl, Modal } from 'react-bootstrap'
import { local } from '../utils/api.js'
import '../index.css'

class Upload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      upload: false,
      createDir: '',
      showModal: false,
      dirName: '',
      listDir: [],
      album: '',
      isLoading: false,
      showModalComment: false,
      idPic: '',
      commentPic: '',
      writeComment: ''
    }
    this.handleCreateDossier = this.handleCreateDossier.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleChangeSelect = this.handleChangeSelect.bind(this)
    this.handleShowAlbum = this.handleShowAlbum.bind(this)
    this.handleShowComment = this.handleShowComment.bind(this)
    this.handleModalComment = this.handleModalComment.bind(this)
  }

  componentWillMount () {
    // if (global.localStorage.getItem('token') !== '123456789') {
    //   this.props.history.push('/')
    // }
    local().get('/picture/getDir').then((res) => {
      if (res.data.success === true) {
        this.setState({
          listDir: res.data.result
        })
      }
    }).catch((err) => {
      console.log(err.response)
    })
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
        local().put('/picture/putpicture', {
          pic: reader.result,
          name: file.name,
          type: type,
          dirName: this.state.dirName
        }).then((res) => {
          if (res.data.success === true) {
            this.setState({isLoading: false})
          }
        }).catch((err) => {
          if (err.response) {
            console.log(err.response.data.error)
          }
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

  handleCreateDossier () {
    local().put('/picture/putdir', {
      name: this.state.createDir
    }).then((res) => {
      if (res.data.success === true) {
        this.setState({
          listDir: res.data.result,
          createDir: '',
          showModal: false
        })
      } else {
        console.log('autre probleme')
      }
    }).catch((err) => {
      console.log(err.response)
    })
  }

  handleShowModal (evt) {
    if (this.state.createDir !== '' && (evt.key === 'Enter' || evt.target.name === 'submit')) {
      this.setState({showModal: true})
    }
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleShowAlbum () {
    this.setState({
      isLoading: true
    })
    local().get('/picture/getalbum', {
      params: {
        dirName: this.state.dirName
      }
    }).then((res) => {
      if (res.data.success === true) {
        console.log(res.data.result[0].pictures)
        this.setState({
          isLoading: false,
          album: res.data.result[0].pictures,
          albumName: res.data.result[0]._id
        })
      }
    }).catch((err) => {
      console.log(err.response)
    })
  }

  handleChangeSelect (evt) {
    if (evt.target.value === '' || evt.target.value !== this.state.dirName) {
      this.setState({
        album: '',
        albumName: ''
      })
    }
    this.setState({dirName: evt.target.value})
  }
  handleformulaire () {
    return (
      <div id='formulaire'>
        <h1>Créer un Dossier Photo</h1>
        <FormGroup bsSize='small'>
          <FormControl
            className='inputform'
            name='createDir'
            type='text'
            placeholder='Dossier'
            value={this.state.createDir}
            onChange={this.handleChange}
            onKeyPress={this.handleShowModal}
          />
          {' '}
          {this.state.createDir !== '' ? (
            <Button
              className='buttonform'
              bsStyle='primary'
              name='submit'
              onClick={() => this.setState({ showModal: true })}
            >
              Créer
          </Button>
          ) : (
            <Button
              className='buttonform'
              bsStyle='primary'
              name='submit'
              disabled
              onClick={() => this.setState({ showModal: true })}
            >
              Créer
          </Button>
          )}
        </FormGroup>
      </div>
    )
  }
  handleModal () {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Êtes-vous sur du nom ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>{this.state.createDir}</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.setState({showModal: false})}>Non</Button>
          <Button bsStyle='primary' onClick={this.handleCreateDossier}>Oui</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  handleSelect () {
    return (
      <div id='selected'>
        <FormGroup controlId='formControlsSelect'>
          <h1>Selectionner Un Dossier</h1>
          <FormControl
            className='option'
            componentClass='select'
            placeholder='select'
            onChange={this.handleChangeSelect.bind(this)}>
            <option value=''>...</option>
            {this.state.listDir.map((tab, index) => {
              return (<option key={index} value={tab}>{tab}</option>)
            })}
          </FormControl>
        </FormGroup>
      </div>
    )
  }
  handleMultiButton () {
    return (
      <div id='multiButton'>
        {this.state.dirName ? (
          <Button className='button' bsStyle='primary' bsSize='large' disabled={this.state.isLoading} onClick={!this.state.isLoading ? this.handleShowAlbum : null}>{this.state.isLoading ? 'Loading...' : 'Show'}</Button>
        ) : (
          <Button className='button' bsStyle='primary' bsSize='large' onClick={this.handleShowAlbum} disabled>Show</Button>
        )}
        {this.state.dirName ? (
          <Dropzone
            disablePreview
            className='button'
            accept='image/png, image/jpeg'
            maxSize={10000000000}
            onDrop={this.onDrop.bind(this)}>
            <Button bsStyle='primary' bsSize='large'>Upload</Button>
          </Dropzone>
        ) : (
          <Button bsStyle='primary' bsSize='large' disabled>Upload</Button>
        )}
      </div>

    )
  }
  handleShowModalComment () {

  }
  handleShowComment () {
    if (this.state.writeComment !== '') {
      
      local().patch('/picture/addcomment', {
        idPic: this.state.idPic,
        commentPic: this.state.writeComment,
        dir: this.state.dirName
      }).then((res) => {
        this.setState({
          idPic: '',
          writeComment: '',
          commentPic: '',
          showModalComment: false
        })
      }).catch((err) => {
        console.log(err.response)
      })
    }
  }
  handleModalComment (evt) {
    this.setState({
      commentPic: evt.target.comment,
      idPic: evt.target.name,
      showModalComment: true
    })
  }
  render () {
    return (
      <div>
        {this.handleformulaire()}
        {this.handleModal()}
        {this.handleSelect()}
        {this.handleMultiButton()}
        <Modal show={this.state.showModalComment} onHide={() => this.setState({showModalComment: false})}>
          <Modal.Header closeButton>
            <Modal.Title>Commentaire</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input name='writeComment' value={this.state.writeComment} placeholder={this.state.commentPic} onChange={this.handleChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({showModalComment: false})}>Non</Button>
            <Button bsStyle='primary' onClick={this.handleShowComment}>Oui</Button>
          </Modal.Footer>
        </Modal>
        <div>
          {this.state.album ? this.state.album.map((tab, index) => {
            return (
              <img className='elementOfGrid' name={tab._id} comment={tab.comment} onClick={this.handleModalComment} key={index} src={`http://localhost:3005/picture/getpicture/carousel/${this.state.albumName}${tab.path}/${tab.type}`} alt='test' />
            )
          })
          : (
            null
          )}
        </div>
      </div>
    )
  }
}

export default Upload
