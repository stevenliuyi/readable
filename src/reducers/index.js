import { combineReducers } from 'redux'
import { RECEIVE_POSTS, RECEIVE_CATEGORIES } from '../actions';

function posts(state = {}, action) {
  const { received_posts } = action
  
  switch (action.type) {
    case RECEIVE_POSTS :
      return received_posts
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
  categories
})
