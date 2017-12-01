import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Button, FormGroup, FormControl, Modal, ControlLabel } from 'react-bootstrap'
import { local } from '../../utils/api.js'
import '../../css/upload.css'

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
      writeComment: '',
      picType: '',
      showModalDirectory: false
    }
    this.handleCreateDossier = this.handleCreateDossier.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleShowAlbum = this.handleShowAlbum.bind(this)
    this.handleShowComment = this.handleShowComment.bind(this)
    this.handleModalComment = this.handleModalComment.bind(this)
    this.handleDeletePict = this.handleDeletePict.bind(this)
    this.handleShowModalDirectory = this.handleShowModalDirectory.bind(this)
    this.handleDeleteDirectory = this.handleDeleteDirectory.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
  }
  componentWillMount () {
    // if (global.localStorage.getItem('token') !== '123456789') {
    //   this.props.history.push('/')
    // }
    local().get('/picture/directory').then((res) => {
      if (res.data.success === true) this.setState({listDir: res.data.result})
    }).catch((err) => { console.log(err.response) })
  }
  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
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
  handleCreateDossier () {
    if (this.state.createDir.trim() !== '') {
      local().put('/picture/directory', {
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
      }).catch((err) => { console.log(err.response) })
    }
  }
  handleShowModalDirectory () {
    if (this.state.dirName.trim() !== '') {
      this.setState({ showModalDirectory: true })
    }
  }
  handleDeleteDirectory () {
    if (this.state.dirName.trim() !== '') {
      local().delete('/picture/directory', {
        params: {
          dir: this.state.dirName
        }
      }).then((res) => {
        if (res.data.success === true) {
          this.setState({
            showModalDirectory: false,
            dirName: '',
            album: '',
            albumName: ''
          })
          local().get('/picture/directory').then((res) => {
            if (res.data.success === true) this.setState({listDir: res.data.result})
          }).catch((err) => { console.log(err.response) })
        }
      }).catch((err) => { console.log(err.response) })
    }
  }
  handleModalDeleteDirectory () {
    return (
      <Modal show={this.state.showModalDirectory} onHide={() => this.setState({ showModalDirectory: false })}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Directory ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Êtes-vous sur de vouloir supprimer le repertoire "{this.state.dirName}" ?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.setState({ showModalDirectory: false })}>Non</Button>
          <Button bsStyle='danger' onClick={this.handleDeleteDirectory}>Oui</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  handleShowAlbum () {
    this.setState({ isLoading: true }, () => {
      local().get('/picture/album', {
        params: {
          dir: this.state.dirName
        }
      }).then((res) => {
        if (res.data.success === true) {
          this.setState({
            album: res.data.result[0].pictures,
            albumName: res.data.result[0]._id
          })
        }
        this.setState({ isLoading: false })
      }).catch((err) => { console.log(err.response) })
    })
  }
  handleChangeSelect (evt) {
    if (evt.target.value !== this.state.dirName) {
      this.setState({
        album: '',
        albumName: '',
        dirName: evt.target.value
      })
    }
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
          />
          {' '}
          {this.state.createDir.trim() !== '' ? (
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
  handleModalCreateDirectory () {
    return (
      <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
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
          <Button className='button' bsStyle='danger' bsSize='large' onClick={this.handleShowModalDirectory}>Delete</Button>
        ) : (
          <Button className='button' bsStyle='danger' bsSize='large' disabled>Delete</Button>
        )}
        {this.state.dirName ? (
          <Button className='button' bsStyle='primary' bsSize='large' disabled={this.state.isLoading} onClick={!this.state.isLoading ? this.handleShowAlbum : null}>{this.state.isLoading ? 'Loading...' : 'Show'}</Button>
        ) : (
          <Button className='button' bsStyle='primary' bsSize='large' disabled>Show</Button>
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
  handleShowComment () {
    if (this.state.writeComment.trim() !== '') {
      local().patch('/picture/comment', {
        idPic: this.state.idPic,
        commentPic: this.state.writeComment,
        dir: this.state.dirName
      }).then((res) => {
        if (res.data.success === true) {
          this.setState({
            idPic: '',
            writeComment: '',
            commentPic: '',
            showModalComment: false,
            isLoading: true
          })
          local().get('/picture/album', {
            params: {
              dir: this.state.dirName
            }
          }).then((res) => {
            if (res.data.success === true) {
              this.setState({
                isLoading: false,
                album: res.data.result[0].pictures,
                albumName: res.data.result[0]._id
              })
            }
          }).catch((err) => { console.log(err.response) })
        }
      }).catch((err) => { console.log(err.response) })
    }
  }
  handleModalComment (evt) {
    this.setState({
      commentPic: evt.target.title,
      idPic: evt.target.name,
      showModalComment: true,
      picType: evt.target.alt
    })
  }
  handleDeletePict () {
    if (this.state.idPic !== '') {
      local().delete('/picture/picture', {
        params: {
          idPic: this.state.idPic,
          dir: this.state.dirName,
          picType: this.state.picType
        }
      }).then((res) => {
        if (res.data.success === true) {
          this.setState({showModalComment: false})
          local().get('/picture/album', {
            params: {
              dir: this.state.dirName
            }
          }).then((res) => {
            if (res.data.success === true) {
              this.setState({
                isLoading: false,
                album: res.data.result[0].pictures,
                albumName: res.data.result[0]._id
              })
            }
          }).catch((err) => { console.log(err.response) })
        }
      }).catch((err) => { console.log(err.response) })
    }
  }
  handleDeleteComment () {
    if (this.state.commentPic !== '') {
      local().delete('/picture/comment', {
        params: {
          dir: this.state.dirName,
          idPic: this.state.idPic
        }
      }).then((res) => {
        if (res.data.success === true) {
          local().get('/picture/album', {
            params: {
              dir: this.state.dirName
            }
          }).then((res) => {
            if (res.data.success === true) {
              this.setState({
                album: res.data.result[0].pictures,
                albumName: res.data.result[0]._id,
                showModalComment: false
              })
            }
            this.setState({ isLoading: false })
          }).catch((err) => { console.log(err.response) })
        }
      }).catch((err) => { console.log(err.response) })
    }
  }
  render () {
    return (
      <div>
        {this.handleformulaire()}
        {this.handleModalCreateDirectory()}
        {this.handleModalDeleteDirectory()}
        {this.handleSelect()}
        {this.handleMultiButton()}
        <Modal show={this.state.showModalComment} onHide={() => this.setState({ showModalComment: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Commentaire</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ControlLabel>Commentaire Actuel: {this.state.commentPic}</ControlLabel>
            <FormGroup>
              <FormControl name='writeComment' type='text' placeholder='' value={this.state.writeComment} onChange={this.handleChange} />
            </FormGroup>
            {' '}
            <Button bsStyle='danger' onClick={this.handleDeletePict}>Delete Picture</Button>
            {this.state.commentPic !== '' ? (
              <Button bsStyle='danger' onClick={this.handleDeleteComment}>Delete comment</Button>
            ) : (
              <Button bsStyle='danger' disabled>Supprimer le commentaire</Button>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ showModalComment: false })}>Non</Button>
            <Button bsStyle='primary' onClick={this.handleShowComment}>Oui</Button>
          </Modal.Footer>
        </Modal>
        <div id='grid'>
          {this.state.album ? this.state.album.map((tab, index) => {
            return (
              <img className='elementOfGrid' name={tab.id} alt={tab.type} title={tab.comment} onClick={this.handleModalComment} key={index} src={`http://localhost:3005/picture/getpicture/carousel/${this.state.albumName}${tab.path}/${tab.type}`} />
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
