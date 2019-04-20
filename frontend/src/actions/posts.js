import {
  getPost,
  getPosts,
  votePost,
  createPost,
  deletePost
} from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const UPDATE_POST = 'VOTE_POST';

const addPost = post => ({
  type: ADD_POST,
  post
});

const delPost = post => ({
  type: DELETE_POST,
  post
});

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

const updatePost = post => ({
  type: UPDATE_POST,
  post
});

export const newPost = ({ author, title, body, category }) => dispatch =>
  createPost({ author, title, body, category }).then(post =>
    dispatch(addPost(post))
  );

export const removePost = post => dispatch =>
  deletePost(post.id).then(deletedPost => dispatch(delPost(deletedPost)));

export const retrievePosts = (category = null) => dispatch =>
  getPosts(category).then(posts => dispatch(receivePosts(posts)));

export const voteInPost = (post, option) => dispatch =>
  votePost(post.id, option).then(updatedPost =>
    dispatch(updatePost(updatedPost))
  );

export const getSinglePost = id => dispatch =>
  getPost(id).then(post => dispatch(updatePost(post)));
