import {
  createComment,
  deleteComment,
  getComments,
  voteComment
} from '../utils/api';

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

export const newComment = ({ author, body, parentId }) => dispatch =>
  createComment({ author, body, parentId }).then(comment => {
    dispatch(addComment(comment));
  });

export const removeComment = comment => dispatch =>
  deleteComment(comment.id).then(deletedComment =>
    dispatch(delComment(deletedComment))
  );

export const retrieveComments = postId => dispatch =>
  getComments(postId).then(comments =>
    dispatch(receiveComments(comments, postId))
  );

export const voteInComment = (comment, option) => dispatch =>
  voteComment(comment.id, option).then(updatedPost =>
    dispatch(updateComment(updatedPost))
  );
