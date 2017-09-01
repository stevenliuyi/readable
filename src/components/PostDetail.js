import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import convertTimestamp from '../utils/convert-timestamp'
import { fetchComments, fetchVotePost, fetchVoteComment } from '../actions'

class PostDetail extends Component {
  
  componentWillMount() {
    this.props.dispatch(fetchComments(this.props.post_id))    
  }

  voteOnPost = (id, option) => {
    this.props.dispatch(fetchVotePost(id, option))
  }

  voteOnComment = (id, option) => {
    this.props.dispatch(fetchVoteComment(id, option))
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
            this.props.comments.map( comment => (
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
        </ListGroup>
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
