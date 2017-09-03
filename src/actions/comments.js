export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const UPDATE_COMMENTS_ORDER = "UPDATE_COMMENTS_ORDER"

export const receiveComments = (received_comments) => ({
  type: RECEIVE_COMMENTS,
  received_comments
})

export const addComment = (new_comment) => ({
  type: ADD_COMMENT,
  new_comment
})

export const editComment = (edited_comment) => ({
  type: EDIT_COMMENT,
  edited_comment
})

export const updateCommentsOrder = (order_method) => ({
  type: UPDATE_COMMENTS_ORDER,
  order_method
})

// async action creators
export const fetchComments = (post_id) => (dispatch, getState, api) => (
  api.fetchComments(post_id).then(comments => dispatch(receiveComments(comments)))
)


export const fetchNewComment = (options) => (dispatch, getState, api) => (
  api.addComment(options).then(comment => dispatch(addComment(comment)))
)

export const fetchVoteComment = (comment_id, option) => (dispatch, getState, api) => (
  api.voteComment(comment_id, option).then(comment => dispatch(editComment(comment)))
)

export const fetchEditComment = (comment_id, options) => (dispatch, getState, api) => (
  api.editComment(comment_id, options).then(comment => dispatch(editComment(comment)))
)

export const deleteComment = (comment_id) => (dispatch, getState, api) => (
  api.deleteComment(comment_id).then(comment => dispatch(editComment(comment)))
)

