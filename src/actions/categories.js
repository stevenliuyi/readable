export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"

export const receiveCategories = (received_categories) => ({
  type: RECEIVE_CATEGORIES,
  received_categories
});

// thunk action creator
export const fetchCategories = () => (dispatch, getState, api) => (
  api.fetchCategories().then(
    categories => dispatch(receiveCategories(categories))
  )
)
