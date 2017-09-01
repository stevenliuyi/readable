import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaEllipsisH from 'react-icons/lib/fa/ellipsis-h'
import MdAddCircle from 'react-icons/lib/md/add-circle'
import convertTimestamp from '../utils/convert-timestamp'
import EditPost from './EditPost'
import { fetchVotePost, receivePosts, updateOrderMethod } from '../actions'
import { Link } from 'react-router-dom'

class ListPosts extends Component {
  state = {
    add_post: false
  }

  handlePosts = (posts, category) => {
    let display_posts = null

    // order posts
    switch(this.props.order_method) {
      case "most recent":
        display_posts = posts.sort((a,b) => (b.timestamp - a.timestamp))
        break
      case "oldest":
        display_posts = posts.sort((a,b) => (a.timestamp - b.timestamp))
        break
      case "highest votes":
        display_posts = posts.sort((a,b) => (b.voteScore - a.voteScore))
        break
      case "lowest votes":
        display_posts = posts.sort((a,b) => (a.voteScore - b.voteScore))
        break
      default:
        display_posts = posts
    }

    // change order method to prevent post from moving to 
    // other location when its vote changes
    if (this.props.order_method !== 'none') {
      this.props.dispatch(receivePosts(posts))
      this.props.dispatch(updateOrderMethod('none'))
    }
  
    // filter posts based on category
    if ( category === undefined ) {
      display_posts = posts
    } else {
      display_posts = posts.filter( post => post.category === category )
    }
  
    return display_posts
  }

  hideAddPostForm = () => {
    this.setState({ add_post: false })
  }

  voteOnPost = (id, option) => {
    this.props.dispatch(fetchVotePost(id, option))
  }

  render() {
    return (
      <div>
        <ListGroup>
          {
            Array.isArray(this.props.posts) &&
              this.handlePosts(this.props.posts,
                          this.props.category).map( (post) => (
                <ListGroupItem>
                  <Row>
                    <Col xs={11}>
                      <h2>{ post.title }</h2>
                      <p>{ post.body }</p>
                      <p className="timestamp-text"><Label>{ post.author }</Label>&nbsp;&nbsp;&nbsp;{ convertTimestamp(post.timestamp) }</p>                  
                    </Col>
                    <Col xs={1} className="no-padding">
                      <div className="vote-arrow">
                        <FaCaretUp
                          size={30}
                          onClick={ () => this.voteOnPost(post.id, 'upVote') }
                        />
                      </div>
                      <div className="vote-score">{ post.voteScore }</div>
                      <div className="vote-arrow">
                        <FaCaretDown
                          size={30}
                          onClick={ () => this.voteOnPost(post.id, 'downVote') }
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="detail-icon">
                    <Link to={ `/${ post.category }/${ post.id }`}>
                      <FaEllipsisH size={30} color={'grey'} />
                    </Link>
                  </div>
                </ListGroupItem>
              ))
          }

          {
            // add new post
            this.state.add_post &&
              <ListGroupItem>
                <h2>New Post</h2>
                <EditPost onClose={ this.hideAddPostForm } />
              </ListGroupItem>
          }
        </ListGroup>

        { // add post icon
          !this.state.add_post &&
          <div className="add-post-icon">
            <MdAddCircle
              color={'#337AB7'}
              size={40}
              onClick={ () => this.setState({ add_post: true })}
              />
          </div>
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  posts: state.posts,
  order_method: state.order_method
})

export default connect(mapStateToProps, null, null, {
  pure: false
})(ListPosts)
