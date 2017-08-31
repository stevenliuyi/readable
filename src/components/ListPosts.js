import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNewPost } from '../actions'
import { Row, Col, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaEllipsisH from 'react-icons/lib/fa/ellipsis-h'
import MdAddCircle from 'react-icons/lib/md/add-circle'
import convertTimestamp from '../utils/convert-timestamp'
import serializeForm from 'form-serialize'

class ListPosts extends Component {
  state = {
    add_post: false
  }

  handlePosts = (posts, category, order) => {
    let display_posts = null
  
    // filter posts based on category
    if ( category === undefined ) {
      display_posts = posts
    } else {
      display_posts = posts.filter( post => post.category === category )
    }
  
    // order posts
    switch(order) {
      case "time":
        display_posts = display_posts.sort((a,b) => (b.timestamp - a.timestamp))
        break
      default: // order by votes created by default
        display_posts = display_posts.sort((a,b) => (b.voteScore - a.voteScore))
    }
  
    return display_posts
  }

  submitPost = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    this.props.dispatch(fetchNewPost(values.title, values.body, values.author))
    this.setState({ add_post: false })
  }

  render() {
    return (
      <div>
        <ListGroup>
          {
            Array.isArray(this.props.posts) &&
              this.handlePosts(this.props.posts,
                          this.props.category,
                          this.props.order).map( (post) => (
                <ListGroupItem>
                  <Row>
                    <Col xs={11}>
                      <h2>{ post.title }</h2>
                      <p>{ post.body }</p>
                      <p className="timestamp-text"><Label>{ post.author }</Label>&nbsp;&nbsp;&nbsp;{ convertTimestamp(post.timestamp) }</p>                  
                    </Col>
                    <Col xs={1}>
                      <div className="vote-arrow"><FaCaretUp size={30} /></div>
                      <div className="vote-score">{ post.voteScore }</div>
                      <div className="vote-arrow"><FaCaretDown size={30} /></div>
                    </Col>
                  </Row>
                  <div className="detail-icon">
                    <FaEllipsisH size={30} color={'grey'} />
                  </div>
                </ListGroupItem>
              ))
          }

          {
            // add new post
            this.state.add_post &&
              <ListGroupItem>
                <h2>New Post</h2>
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
                      onClick={ () => this.setState({ add_post: false })}>
                      Cancel</Button>
                  </ButtonToolbar>
                </form>
              </ListGroupItem>
          }
        </ListGroup>
        <div className="add-post-icon">
          <MdAddCircle
            color={'#337AB7'}
            size={40}
            onClick={ () => this.setState({ add_post: true })}
            />
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  posts: state.posts
})

export default connect(mapStateToProps)(ListPosts)
