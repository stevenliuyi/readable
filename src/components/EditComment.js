import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNewComment } from '../actions'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap'
import serializeForm from 'form-serialize'

class EditComment extends Component {
  
  submitComment = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    values.parentId = this.props.parentId
    console.log(values)
    this.props.dispatch(fetchNewComment(values))
    this.props.onClose()
  }

  render() {
    return (
      <form onSubmit={ this.submitComment }>
        <FormGroup>
           <ControlLabel>Comment</ControlLabel>
           <FormControl
             componentClass="textarea"
             name="body"
             placeholder="Enter comment contents"
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

export default connect()(EditComment)
