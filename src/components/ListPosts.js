import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaEllipsisH from 'react-icons/lib/fa/ellipsis-h'
import convertTimestamp from '../utils/convert-timestamp'

const handlePosts = (posts, category) => {
  // filter posts based on category
  if ( category === undefined ) {
    return posts
  } else {
    return posts.filter( post => post.category === category )
  }
}

const ListPosts = (props) => (

  <ListGroup>
    {
      Array.isArray(props.posts) &&
        handlePosts(props.posts, props.category).map( (post) => (
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
  </ListGroup>
)


const mapStateToProps = (state) => ({
  posts: state.posts
})

export default connect(mapStateToProps)(ListPosts)
