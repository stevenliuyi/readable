import * as APIUtil from '../utils/api';

export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const UPDATE_POSTS_ORDER = "UPDATE_POSTS_ORDER"
export const UPDATE_COMMENTS_ORDER = "UPDATE_COMMENTS_ORDER"

export const receivePosts = (received_posts) => ({
  type: RECEIVE_POSTS,
  received_posts
});

export const fetchPosts = () => dispatch => (
  APIUtil.fetchPosts().then(posts => dispatch(receivePosts(posts)))
);

export const receiveCategories = (received_categories) => ({
  type: RECEIVE_CATEGORIES,
  received_categories
});

export const fetchCategories = () => dispatch => (
  APIUtil.fetchCategories().then(
    categories => dispatch(receiveCategories(categories))
  )
)

export const addPost = (new_post) => ({
  type: ADD_POST,
  new_post
})

export const fetchNewPost = (options) => dispatch => (
  APIUtil.addPost(options).then(post => dispatch(addPost(post)))
)

export const editPost = (edited_post) => ({
  type: EDIT_POST,
  edited_post
})

export const fetchVotePost = (post_id, option) => dispatch => (
  APIUtil.votePost(post_id, option).then(post => dispatch(editPost(post)))
)

export const receiveComments = (received_comments) => ({
  type: RECEIVE_COMMENTS,
  received_comments
})

export const fetchComments = (post_id) => dispatch => (
  APIUtil.fetchComments(post_id).then(comments => dispatch(receiveComments(comments)))
)

export const editComment = (edited_comment) => ({
  type: EDIT_COMMENT,
  edited_comment
})

export const fetchVoteComment = (comment_id, option) => dispatch => (
  APIUtil.voteComment(comment_id, option).then(comment => dispatch(editComment(comment)))
)

export const addComment = (new_comment) => ({
  type: ADD_COMMENT,
  new_comment
})

export const fetchNewComment = (options) => dispatch => (
  APIUtil.addComment(options).then(comment => dispatch(addComment(comment)))
)

export const fetchEditComment = (comment_id, options) => dispatch => (
  APIUtil.editComment(comment_id, options).then(comment => dispatch(editComment(comment)))
)

export const updatePostsOrder = (order_method) => ({
  type: UPDATE_POSTS_ORDER,
  order_method
})

export const updateCommentsOrder = (order_method) => ({
  type: UPDATE_COMMENTS_ORDER,
  order_method
})
