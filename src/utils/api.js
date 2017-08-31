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

export const addPost = (title, body, author) => 
  fetch(`${api_url}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
        id: uuid.v4(),
        timestamp: Date.now(),
        title: title,
        body: body,
        author: author,
        category: 'react'
    })
  }).then(res => res.json())
