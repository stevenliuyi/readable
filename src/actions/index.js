import * as APIUtil from '../utils/api';

export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"

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
