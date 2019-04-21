import {
  ADD_POST,
  DELETE_POST,
  RECEIVE_POSTS,
  UPDATE_POST
} from '../actions/posts';

import { ADD_COMMENT, DELETE_COMMENT } from '../actions/comments';

export default function posts(state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      return { ...state, [action.post.id]: action.post };
    case DELETE_POST:
      return Object.keys(state)
        .filter(key => key !== action.post.id)
        .reduce((result, current) => {
          result[current] = state[current];
          return result;
        }, {});
    case RECEIVE_POSTS:
      return { ...action.posts };
    case UPDATE_POST:
      return { ...state, [action.post.id]: action.post };
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          commentCount: state[action.comment.parentId].commentCount + 1
        }
      };
    case DELETE_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          commentCount: state[action.comment.parentId].commentCount - 1
        }
      };
    default:
      return state;
  }
}
