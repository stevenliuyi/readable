import { RECEIVE_POSTS,
         ADD_POST,
         EDIT_POST,
         UPDATE_POSTS_ORDER } from '../actions'
import { sort } from '../utils/helper'

export default function posts(state = {}, action) {
  
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
