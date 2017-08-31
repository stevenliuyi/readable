import * as APIUtil from '../utils/api';

export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"

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
