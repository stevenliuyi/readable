import uuid from 'uuid'
const api_url = 'https://readable-server.herokuapp.com'

const headers = {
  'Authorization': 'whatever-you-want',
  'Content-Type': 'application/json'
}

export const fetchPosts = () =>
  fetch(`${api_url}/posts`, { headers })
    .then(res => res.json())

export const fetchCategories = () =>
  fetch(`${api_url}/categories`, { headers })
    .then(res => res.json())

export const addPost = (options) => 
  fetch(`${api_url}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
        id: uuid.v4(),
        timestamp: Date.now(),
        title: options.title,
        body: options.body,
        author: options.author,
        category: options.category
    })
  }).then(res => res.json())

export const votePost = (post_id, option) =>
  fetch(`${api_url}/posts/${post_id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option })
  }).then(res => res.json())

export const editPost = (post_id, options) =>
  fetch(`${api_url}/posts/${post_id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
        timestamp: Date.now(),
        title: options.title,
        body: options.body,
        author: options.author,
        category: options.category
    })
  }).then(res => res.json())

export const deletePost = (post_id) =>
  fetch(`${api_url}/posts/${post_id}`, {
    method: 'DELETE',
    headers
    }).then(res => res.json())

export const fetchComments = (post_id) =>
  fetch(`${api_url}/posts/${post_id}/comments`, { headers })
    .then(res => res.json())

export const voteComment = (comment_id, option) =>
  fetch(`${api_url}/comments/${comment_id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option })
  }).then(res => res.json())

export const editComment = (comment_id, options) =>
  fetch(`${api_url}/comments/${comment_id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
        timestamp: Date.now(),
        body: options.body,
        author: options.author
    })
  }).then(res => res.json())

export const addComment = (options) => 
  fetch(`${api_url}/comments`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
        id: uuid.v4(),
        parentId: options.parentId,
        timestamp: Date.now(),
        body: options.body,
        author: options.author,
    })
  }).then(res => res.json())

export const deleteComment = (comment_id) =>
  fetch(`${api_url}/comments/${comment_id}`, {
    method: 'DELETE',
    headers
    }).then(res => res.json())
