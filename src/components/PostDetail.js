import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import MdAddCircle from 'react-icons/lib/md/add-circle'
import convertTimestamp from '../utils/convert-timestamp'
import EditComment from './EditComment'
import { fetchComments,
         fetchVotePost,
         fetchVoteComment,
         receiveComments,
         updateOrderMethod } from '../actions'

class PostDetail extends Component {
  state = {
    add_comment: false
  }
  
  componentWillMount() {
    this.props.dispatch(fetchComments(this.props.post_id))    
  }

  handleComments = (comments) => {
    let display_comments = null
    // order comments
    switch(this.props.order_method) {
      case "most recent":
        display_comments = comments.sort((a,b) => (b.timestamp - a.timestamp))
        break
      case "oldest":
        display_comments = comments.sort((a,b) => (a.timestamp - b.timestamp))
        break
      case "highest votes":
        display_comments = comments.sort((a,b) => (b.voteScore - a.voteScore))
        break
      case "lowest votes":
        display_comments = comments.sort((a,b) => (a.voteScore - b.voteScore))
        break
      default:
        display_comments = comments
    }

    // change order method to prevent comment from moving to 
    // other location when its vote changes
    if (this.props.order_method !== 'none') {
      this.props.dispatch(receiveComments(comments))
      this.props.dispatch(updateOrderMethod('none'))
    }
    
    return display_comments
    
  }

  voteOnPost = (id, option) => {
    this.props.dispatch(fetchVotePost(id, option))
  }

  voteOnComment = (id, option) => {
    this.props.dispatch(fetchVoteComment(id, option))
  }

  hideAddCommentForm = () => {
    this.setState({ add_comment: false })
  }
  render() {
    return (
      <div>
        { this.props.post !== null &&
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col xs={11}>
                  <h2>{ this.props.post.title }</h2>
                  <p>{ this.props.post.body }</p>
                  <p className="timestamp-text"><Label>{ this.props.post.author }</Label>&nbsp;&nbsp;&nbsp;{ convertTimestamp(this.props.post.timestamp) }</p>                  
                </Col>
                <Col xs={1} className="no-padding">
                  <div className="vote-arrow">
                    <FaCaretUp
                      size={30}
                      onClick={ () => this.voteOnPost(this.props.post.id, 'upVote') }
                    />
                  </div>
                  <div className="vote-score">{ this.props.post.voteScore }</div>
                  <div className="vote-arrow">
                    <FaCaretDown
                      size={30}
                      onClick={ () => this.voteOnPost(this.props.post.id, 'downVote') }
                    />
                  </div>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>

        }
        <h3>Comments</h3>
  
        { /* comments */ }
        <ListGroup>
          { Array.isArray(this.props.comments) &&
            this.handleComments(this.props.comments).map( comment => (
              <ListGroupItem>
                <Row>
                  <Col xs={11}>
                    <p>{ comment.body }</p>
                    <p className="timestamp-text"><Label>{ comment.author }</Label>&nbsp;&nbsp;&nbsp;{ convertTimestamp(comment.timestamp) }</p>                  
                  </Col>
                  <Col xs={1} className="no-padding">
                    <div className="vote-arrow">
                      <FaCaretUp
                        size={30}
                        onClick={ () => this.voteOnComment(comment.id, 'upVote') }
                      />
                    </div>
                    <div className="vote-score">{ comment.voteScore }</div>
                    <div className="vote-arrow">
                      <FaCaretDown
                        size={30}
                        onClick={ () => this.voteOnComment(comment.id, 'downVote') }
                      />
                    </div>
                  </Col>
                </Row>
              </ListGroupItem>
            ))
          }
          { // add new comment
            this.state.add_comment &&
              <ListGroupItem>
                <h3>New Comment</h3>
                <EditComment
                  parentId={ this.props.post_id }
                  onClose={ this.hideAddCommentForm }
                />
              </ListGroupItem>
          }
        </ListGroup>

        { // add comment icon
          !this.state.add_comment &&
          <div className="add-icon">
            <MdAddCircle
              color={'#337AB7'}
              size={40}
              onClick={ () => this.setState({ add_comment: true })}
              />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const post = Array.isArray(state.posts) ?
      state.posts.find(post => post.id === props.post_id) :
      null
  return {
    post,
    comments: state.comments,
    order_method: state.order_method
  }
}

export default connect(mapStateToProps)(PostDetail)