import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNewPost } from '../actions'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap'
import serializeForm from 'form-serialize'

class EditPost extends Component {
  
  submitPost = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    this.props.dispatch(fetchNewPost(values.title, values.body, values.author))
    this.props.onClose()
  }

  render() {
    return (
      <form onSubmit={ this.submitPost }>
        <FormGroup>
           <ControlLabel>Title</ControlLabel>
           <FormControl
             type="text"
             name="title"
             placeholder="Enter title"
           />
           <ControlLabel>Post</ControlLabel>
           <FormControl
             componentClass="textarea"
             name="body"
             placeholder="Enter post contents"
           />
           <ControlLabel>Author</ControlLabel>
           <FormControl
             type="text"
             name="author"
             placeholder="Enter author name"
           />
        </FormGroup>
        <ButtonToolbar>
          <Button
            bsStyle="primary"
            type="submit">
            Submit</Button>
          <Button
            onClick={ () => this.props.onClose() }>
            Cancel</Button>
        </ButtonToolbar>
      </form>
    )
  }
}

export default connect()(EditPost)
