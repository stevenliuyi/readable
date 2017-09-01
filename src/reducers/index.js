import { combineReducers } from 'redux'
import { RECEIVE_POSTS,
         ADD_POST,
         EDIT_POST,
         RECEIVE_COMMENTS,
         ADD_COMMENT,
         EDIT_COMMENT,
         RECEIVE_CATEGORIES,
         UPDATE_ORDER_METHOD} from '../actions';

function posts(state = {}, action) {
  
  switch (action.type) {
    case RECEIVE_POSTS :
      const { received_posts } = action
      return received_posts
    case ADD_POST:
      const { new_post } = action
      return [...state, new_post]
    case EDIT_POST:
      const { edited_post } = action
      return state.map( (post, index) => post.id === edited_post.id ?
              edited_post : post )   
    default:
      return state
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS :
      const { received_comments } = action
      return received_comments
    case ADD_COMMENT:
      const { new_comment } = action
      return [...state, new_comment]
    case EDIT_COMMENT:
      const { edited_comment } = action
      return state.map( (comment, index) => comment.id === edited_comment.id ?
              edited_comment : comment )   
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


function order_method(state="highest votes", action) {
  const { method } = action
  switch (action.type) {
    case UPDATE_ORDER_METHOD:
      return method
    default:
      return state
  }
}

export default combineReducers({
  posts,
  comments,
  categories,
  order_method
})
