import { combineReducers } from 'redux'
import { RECEIVE_POSTS } from '../actions';

function posts(state = {}, action) {
  const { received_posts } = action
  
  switch (action.type) {
    case RECEIVE_POSTS :
      return received_posts
    default:
      return state
  }
}

export default combineReducers({posts})
