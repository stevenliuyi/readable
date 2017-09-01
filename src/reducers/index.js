import { combineReducers } from 'redux'
import { RECEIVE_POSTS,
         ADD_POST,
         EDIT_POST,
         RECEIVE_COMMENTS,
         ADD_COMMENT,
         EDIT_COMMENT,
         RECEIVE_CATEGORIES,
         UPDATE_POSTS_ORDER,
         UPDATE_COMMENTS_ORDER } from '../actions';
import { sort } from '../utils/helper'

function posts(state = {}, action) {
  
  switch (action.type) {
    case RECEIVE_POSTS :
      const { received_posts } = action
      // ordered by votes by default
      return sort(received_posts, 'highest votes')
    case ADD_POST:
      const { new_post } = action
      return [...state, new_post]
    case EDIT_POST:
      const { edited_post } = action
      return state.map( (post, index) => post.id === edited_post.id ?
              edited_post : post )   
    case UPDATE_POSTS_ORDER:
      const { order_method } = action
      return (Array.isArray(state)) ? sort(state, order_method) : state
    default:
      return state
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS :
      const { received_comments } = action
      // ordered by votes by default
      return sort(received_comments, 'highest votes')
    case ADD_COMMENT:
      const { new_comment } = action
      return [...state, new_comment]
    case EDIT_COMMENT:
      const { edited_comment } = action
      return state.map( (comment, index) => comment.id === edited_comment.id ?
              edited_comment : comment )   
    case UPDATE_COMMENTS_ORDER:
      const { order_method } = action
      return (Array.isArray(state)) ? sort(state, order_method) : state
    default:
      return state
  }
}

function categories(state ={}, action) {
  const { received_categories } = action

  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return received_categories
    default:
      return state
  }
}

export default combineReducers({
  posts,
  comments,
  categories
})
