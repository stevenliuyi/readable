import { RECEIVE_COMMENTS,
         ADD_COMMENT,
         EDIT_COMMENT,
         UPDATE_COMMENTS_ORDER } from '../actions'
import { sort } from '../utils/helper'

export default function comments(state = {}, action) {
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
