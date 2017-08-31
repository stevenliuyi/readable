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
    this.props.dispatch(fetchNewPost(values))
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
           <ControlLabel>Category</ControlLabel>
           <FormControl
             componentClass="select"
             name="category"
             placeholder={ this.props.category[0].name }>
             { this.props.category.map( (cat) => ( 
               <option value={ cat.name }>{ cat.name }</option>      
               ))}
           </FormControl>
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

const mapStateToProps = (state) => (
  { category: state.categories }
)

export default connect(mapStateToProps)(EditPost)
