const api_url = 'http://localhost:5001'

const headers = {
  'Authorization': 'whatever-you-want'
}

export const fetchPosts = () =>
  fetch(`${api_url}/posts`, { headers })
    .then(res => res.json())
