import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNewPost, fetchEditPost } from '../actions'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap'
import serializeForm from 'form-serialize'

class EditPost extends Component {
  
  submitPost = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })

    if (typeof this.props.post === 'object') {
      this.props.dispatch(fetchEditPost(this.props.post.id, values))
    } else {
      this.props.dispatch(fetchNewPost(values))
    }
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
             defaultValue={ (typeof this.props.post === 'object') ?
               this.props.post.title : "" }
           />
           <ControlLabel>Post</ControlLabel>
           <FormControl
             componentClass="textarea"
             name="body"
             placeholder="Enter post contents"
             defaultValue={ (typeof this.props.post === 'object') ?
               this.props.post.body : "" }
           />
           <ControlLabel>Author</ControlLabel>
           <FormControl
             type="text"
             name="author"
             placeholder="Enter author name"
             defaultValue={ (typeof this.props.post === 'object') ?
               this.props.post.author : "" }
           />
           <ControlLabel>Category</ControlLabel>
           <FormControl
             componentClass="select"
             name="category"
             placeholder={ this.props.category[0].name }
             defaultValue={ (typeof this.props.post === 'object') ?
               this.props.post.category : "" }>
             { this.props.category.map( (cat) => ( 
               <option key={ cat.name } value={ cat.name }>{ cat.name }</option>      
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
