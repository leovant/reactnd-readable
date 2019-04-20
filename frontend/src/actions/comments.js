import {
  createComment,
  deleteComment,
  getComments,
  voteComment,
  updateComment as alterComment
} from '../utils/api';
import { error } from '../utils/helpers';

export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

const addComment = comment => ({
  type: ADD_COMMENT,
  comment
});

const delComment = comment => ({
  type: DELETE_COMMENT,
  comment
});

const receiveComments = (comments, postId) => ({
  type: RECEIVE_COMMENTS,
  comments,
  postId
});

const updateComment = comment => ({
  type: UPDATE_COMMENT,
  comment
});

export const newComment = ({ body, parentId }) => dispatch =>
  createComment({ body, parentId })
    .then(comment => {
      dispatch(addComment(comment));
    })
    .catch(() => error('The comment could not be saved!'));

export const removeComment = comment => dispatch =>
  deleteComment(comment.id)
    .then(deletedComment => dispatch(delComment(deletedComment)))
    .catch(() => error('The comment could not be deleted!'));

export const retrieveComments = postId => dispatch =>
  getComments(postId)
    .then(comments => dispatch(receiveComments(comments, postId)))
    .catch(() => error('Could not get comments!'));

export const voteInComment = (comment, option) => dispatch =>
  voteComment(comment.id, option)
    .then(updatedPost => dispatch(updateComment(updatedPost)))
    .catch(() => error('Could not register the vote!'));

export const editComment = (comment, body) => dispatch =>
  alterComment(comment.id, body)
    .then(updatedComment => dispatch(updateComment(updatedComment)))
    .catch(() => error('The comment could not be updated!'));
