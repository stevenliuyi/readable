import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaEllipsisH from 'react-icons/lib/fa/ellipsis-h'
import convertTimestamp from '../utils/convert-timestamp'

const handlePosts = (posts, category, order) => {
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

const ListPosts = (props) => (

  <ListGroup>
    {
      Array.isArray(props.posts) &&
        handlePosts(props.posts,
                    props.category,
                    props.order).map( (post) => (
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
