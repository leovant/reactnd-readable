import {
  getPost,
  getPosts,
  votePost,
  createPost,
  deletePost,
  updatePost as alterPost
} from '../utils/api';
import { error } from '../utils/helpers';

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

export const newPost = ({ title, body, category }) => dispatch =>
  createPost({ title, body, category })
    .then(post => dispatch(addPost(post)))
    .catch(() => error('The post could not be added!'));

export const removePost = post => dispatch =>
  deletePost(post.id)
    .then(deletedPost => dispatch(delPost(deletedPost)))
    .catch(() => error('The post could not be deleted!'));

export const retrievePosts = (category = null) => dispatch =>
  getPosts(category)
    .then(posts => dispatch(receivePosts(posts)))
    .catch(() => error('Could not get posts!'));

export const voteInPost = (post, option) => dispatch =>
  votePost(post.id, option)
    .then(updatedPost => dispatch(updatePost(updatedPost)))
    .catch(() => error('Could not register vote!'));

export const getSinglePost = id => dispatch =>
  getPost(id)
    .then(post => {
      if (!post.id || post.deleted) {
        return error('Post not found!');
      }
      return dispatch(updatePost(post));
    })
    .catch(() => error('Could not get post data!'));

export const editPost = (post, title, body) => dispatch =>
  alterPost(post.id, title, body)
    .then(updatedPost => dispatch(updatePost(updatedPost)))
    .catch(() => error('The post could not be updated!'));
