import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import convertTimestamp from '../utils/convert-timestamp'
import { fetchVotePost } from '../actions'

class PostDetail extends Component {
  
  voteOnPost = (id, option) => {
    this.props.dispatch(fetchVotePost(id, option))
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
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  if(Array.isArray(state.posts)) {
    return { post: state.posts.find(post => post.id === props.post_id) }
  } else {
    return { post: null }
  }
}

export default connect(mapStateToProps)(PostDetail)
