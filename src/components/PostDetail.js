import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import MdAddCircle from 'react-icons/lib/md/add-circle'
import MdEdit from 'react-icons/lib/md/edit'
import MdDelete from 'react-icons/lib/md/delete'
import { convertTimestamp } from '../utils/helper'
import EditComment from './EditComment'
import { fetchComments,
         fetchVotePost,
         fetchVoteComment } from '../actions'

class PostDetail extends Component {
  state = {
    add_comment: false,
    edit_comment: null
  }
  
  componentWillMount() {
    this.props.dispatch(fetchComments(this.props.post_id))    
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

  hideEditCommentForm = () => {
    this.setState({ edit_comment: null })
  }

  editComment = (comment_id) => {
    this.setState({ edit_comment: comment_id })
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
                  <Row>
                    <Col xs={6}>
                      <MdEdit size={18} />
                      <MdDelete size={18} />
                    </Col>
                    <Col xs={6}>
                      <p className="timestamp-text"><Label>{ this.props.post.author }</Label>&nbsp;&nbsp;&nbsp;{ convertTimestamp(this.props.post.timestamp) }</p>                  
                    </Col>
                  </Row>
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
            this.props.comments.map( comment => {
              if (this.state.edit_comment !== comment.id) {
                return (
                  <ListGroupItem>
                    <Row>
                      <Col xs={11}>
                        <p>{ comment.body }</p>
                        <Row>
                          <Col xs={6}>
                            <MdEdit
                              className="edit-icon"
                              onClick={ () => this.editComment(comment.id) }
                              size={18} />
                            <MdDelete size={18} />
                          </Col>
                          <Col xs={6}>
                            <p className="timestamp-text"><Label>{ comment.author }</Label>&nbsp;&nbsp;&nbsp;{ convertTimestamp(comment.timestamp) }</p>                  
                          </Col>
                        </Row>
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
                  ) 
                } else {
                  // edit comment
                  return (
                    <ListGroupItem>
                      <EditComment
                        parentId={ this.props.post_id }
                        onClose={ this.hideEditCommentForm }
                        comment={ comment }
                      />
                    </ListGroupItem>
                  )
                }
            })
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
    comments: state.comments
  }
}

export default connect(mapStateToProps)(PostDetail)
