import { generateId, now } from './helpers';

const api = 'http://localhost:3001';
const username = 'anonymous';

let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Authorization: token
};

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPosts = (category = null) => {
  let url = `${api}/posts`;

  if (category) {
    url = `${api}/${category}/posts`;
  }
  return fetch(url, { headers })
    .then(res => res.json())
    .then(data => {
      const posts = {};

      data.forEach(post => {
        posts[post.id] = post;
      });
      return posts;
    });
};

export const votePost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ option })
  }).then(res => res.json());

export const getPost = id =>
  fetch(`${api}/posts/${id}`, { headers }).then(res => res.json());

export const createPost = ({ title, body, category }) => {
  const post = {
    id: generateId(),
    timestamp: now(),
    author: username,
    title,
    body,
    category
  };
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  }).then(res => res.json());
};

export const deletePost = id =>
  fetch(`${api}/posts/${id}`, { method: 'DELETE', headers }).then(res =>
    res.json()
  );

export const updatePost = (id, title, body) => {
  const data = {
    timestamp: now(),
    title,
    body
  };
  return fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());
};

export const getComments = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => {
      const comments = {};

      data.forEach(comment => {
        comments[comment.id] = comment;
      });
      return comments;
    });

export const voteComment = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ option })
  }).then(res => res.json());

export const createComment = ({ body, parentId }) => {
  const comment = {
    id: generateId(),
    timestamp: now(),
    author: username,
    body,
    parentId
  };
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  }).then(res => res.json());
};

export const deleteComment = id =>
  fetch(`${api}/comments/${id}`, { method: 'DELETE', headers }).then(res =>
    res.json()
  );

export const updateComment = (id, body) => {
  const data = {
    timestamp: now(),
    body
  };
  return fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());
};
