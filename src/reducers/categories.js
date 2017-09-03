import { RECEIVE_CATEGORIES } from '../actions'

export default function categories(state ={}, action) {
  const { received_categories } = action

  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return ('categories' in received_categories) ?
        received_categories.categories :
        state
    default:
      return state
  }
}
