import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import MdAddCircle from 'react-icons/lib/md/add-circle'
import MdEdit from 'react-icons/lib/md/edit'
import MdDelete from 'react-icons/lib/md/delete'
import { convertTimestamp } from '../utils/helper'
import EditComment from './EditComment'
import EditPost from './EditPost'
import { fetchComments,
         fetchVotePost,
         fetchVoteComment,
         deletePost,
         deleteComment } from '../actions'
import PropTypes from 'prop-types'

class PostDetail extends Component {
  state = {
    edit_post: false,
    add_comment: false,
    edit_comment: null
  }
  
  componentWillMount() {
    this.props.fetchComments(this.props.post_id)    
  }

  voteOnPost = (id, option) => {
    this.props.fetchVotePost(id, option)
  }

  voteOnComment = (id, option) => {
    this.props.fetchVoteComment(id, option)
  }

  hideEditPostForm = () => {
    this.setState({ edit_post: false })
  }

  hideAddCommentForm = () => {
    this.setState({ add_comment: false })
  }

  hideEditCommentForm = () => {
    this.setState({ edit_comment: null })
  }

  editPost = () => {
    this.setState({ edit_post: true })
  }

  editComment = (comment_id) => {
    this.setState({ edit_comment: comment_id })
  }

  deletePost = () => {
    this.props.deletePost(this.props.post_id)
    // back to the root page after deletion
    this.context.router.history.push("/")
  }
  
  deleteComment = (comment_id) => {
    this.props.deleteComment(comment_id)
  }

  render() {
    if (this.props.post !== null && this.props.post.deleted) return null

    return (
      <div>
        { this.props.post !== null &&
          <ListGroup>
            { !this.state.edit_post &&
              <ListGroupItem>
                <Row>
                  <Col xs={11}>
                    <h2>{ this.props.post.title }</h2>
                    <p>{ this.props.post.body }</p>
                    <Row>
                      <Col xs={6}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip id="editPost">edit post</Tooltip>}
                        >
                          <MdEdit
                            className="edit-icon"
                            onClick={ () => this.editPost() }
                            size={18} />
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip id="deletePost">delete post</Tooltip>}
                        >
                          <MdDelete
                            className="delete-icon"
                            onClick={ () => this.deletePost() }
                            size={18} />
                        </OverlayTrigger>
                      </Col>
                      <Col xs={6}>
                        <p className="timestamp-text"><Label>{ this.props.post.author }</Label>&nbsp;&nbsp;&nbsp;{ convertTimestamp(this.props.post.timestamp) }</p>                  
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={1} className="no-padding">
                    <div className="vote-arrow">
                      <OverlayTrigger
                        placement="left"
                        overlay={<Tooltip id="upVote">upvote</Tooltip>}
                      >
                        <FaCaretUp
                          size={30}
                          onClick={ () => this.voteOnPost(this.props.post.id, 'upVote') }
                        />
                      </OverlayTrigger>
                    </div>
                    <div className="vote-score">{ this.props.post.voteScore }</div>
                    <div className="vote-arrow">
                      <OverlayTrigger
                        placement="left"
                        overlay={<Tooltip id="downVote">downvote</Tooltip>}
                      >
                        <FaCaretDown
                          size={30}
                          onClick={ () => this.voteOnPost(this.props.post.id, 'downVote') }
                        />
                      </OverlayTrigger>
                    </div>
                  </Col>
                </Row>
              </ListGroupItem>
            }

            { // edit post
              this.state.edit_post &&
              <ListGroupItem>
                <EditPost
                  onClose={ this.hideEditPostForm }
                  post={ this.props.post }
                />
              </ListGroupItem>
            }
          </ListGroup>

        }
        <h3>Comments ({ 
          Array.isArray(this.props.comments) ?
            this.props.comments.filter( comment => !comment.deleted).length :
            0
        })</h3>
  
        { /* comments */ }
        <ListGroup>
          { Array.isArray(this.props.comments) &&
            this.props.comments.filter( comment => !comment.deleted).map( comment => {
              if (this.state.edit_comment !== comment.id) {
                return (
                  <ListGroupItem key={ comment.id }>
                    <Row>
                      <Col xs={11}>
                        <p>{ comment.body }</p>
                        <Row>
                          <Col xs={6}>
                            <OverlayTrigger
                              placement="bottom"
                              overlay={<Tooltip id="editComment">edit comment</Tooltip>}
                            >
                              <MdEdit
                                className="edit-icon"
                                onClick={ () => this.editComment(comment.id) }
                                size={18} />
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="bottom"
                              overlay={<Tooltip id="deleteComment">delete comment</Tooltip>}
                            >
                              <MdDelete
                                className="delete-icon"
                                onClick={ () => this.deleteComment(comment.id) }
                                size={18} />
                            </OverlayTrigger>
                          </Col>
                          <Col xs={6}>
                            <p className="timestamp-text"><Label>{ comment.author }</Label>&nbsp;&nbsp;&nbsp;{ convertTimestamp(comment.timestamp) }</p>                  
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={1} className="no-padding">
                        <div className="vote-arrow">
                          <OverlayTrigger
                            placement="left"
                            overlay={<Tooltip id="upVote">upvote</Tooltip>}
                          >
                            <FaCaretUp
                              size={30}
                              onClick={ () => this.voteOnComment(comment.id, 'upVote') }
                            />
                          </OverlayTrigger>
                        </div>
                        <div className="vote-score">{ comment.voteScore }</div>
                        <div className="vote-arrow">
                          <OverlayTrigger
                            placement="left"
                            overlay={<Tooltip id="downVote">downvote</Tooltip>}
                          >
                            <FaCaretDown
                              size={30}
                              onClick={ () => this.voteOnComment(comment.id, 'downVote') }
                            />
                          </OverlayTrigger>
                        </div>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  ) 
                } else {
                  // edit comment
                  return (
                    <ListGroupItem key={ comment.id }>
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
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="addNewComment">add new comment</Tooltip>}
            >
              <MdAddCircle
                color={'#337AB7'}
                size={40}
                onClick={ () => this.setState({ add_comment: true })}
                />
            </OverlayTrigger>
          </div>
        }
      </div>
    )
  }
}

PostDetail.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = ({ posts, comments }, props) => {
  const post = Array.isArray(posts) ?
      posts.find(post => post.id === props.post_id) :
      null
  return { post, comments }
}

export default connect(mapStateToProps, {
  fetchComments,
  fetchVotePost,
  fetchVoteComment,
  deletePost,
  deleteComment
})(PostDetail)
