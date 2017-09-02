import * as APIUtil from '../utils/api';

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"

export const receiveCategories = (received_categories) => ({
  type: RECEIVE_CATEGORIES,
  received_categories
});

// thunk action creator
export const fetchCategories = () => dispatch => (
  APIUtil.fetchCategories().then(
    categories => dispatch(receiveCategories(categories))
  )
)
