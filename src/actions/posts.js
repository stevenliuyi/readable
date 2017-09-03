export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"
export const UPDATE_POSTS_ORDER = "UPDATE_POSTS_ORDER"

export const receivePosts = (received_posts) => ({
  type: RECEIVE_POSTS,
  received_posts
});

export const addPost = (new_post) => ({
  type: ADD_POST,
  new_post
})

export const editPost = (edited_post) => ({
  type: EDIT_POST,
  edited_post
})

export const updatePostsOrder = (order_method) => ({
  type: UPDATE_POSTS_ORDER,
  order_method
})

// async action creators
export const fetchPosts = () => (dispatch, getState, api) => (
  api.fetchPosts().then(posts => dispatch(receivePosts(posts)))
);

export const fetchNewPost = (options) => (dispatch, getState, api) => (
  api.addPost(options).then(post => dispatch(addPost(post)))
)

export const fetchVotePost = (post_id, option) => (dispatch, getState, api) => (
  api.votePost(post_id, option).then(post => dispatch(editPost(post)))
)

export const fetchEditPost = (post_id, options) => (dispatch, getState, api) => (
  api.editPost(post_id, options).then(post => dispatch(editPost(post)))
)

export const deletePost = (post_id) => (dispatch, getState, api) => (
  api.deletePost(post_id).then(post => dispatch(editPost(post)))
)
