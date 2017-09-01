import uuid from 'uuid'
const api_url = 'http://localhost:5001'

const headers = {
  'Authorization': 'whatever-you-want',
  'Content-Type': 'application/json'
}

export const fetchPosts = () =>
  fetch(`${api_url}/posts`, { headers })
    .then(res => res.json())

export const fetchCategories = () =>
  fetch(`${api_url}/categories`, { headers })
    .then(res => res.json()).then(data => data.categories)

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

export const fetchComments = (post_id) =>
  fetch(`${api_url}/posts/${post_id}/comments`, { headers })
    .then(res => res.json())

export const voteComment = (comment_id, option) =>
  fetch(`${api_url}/comments/${comment_id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option })
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
