import {
  ADD_COMMENT,
  DELETE_COMMENT,
  RECEIVE_COMMENTS,
  UPDATE_COMMENT
} from '../actions/comments';

export default function comments(state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          [action.comment.id]: action.comment
        }
      };
    case DELETE_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: Object.keys(state[action.comment.parentId])
          .filter(key => key !== action.comment.id)
          .reduce((result, current) => {
            result[current] = state[action.comment.parentId][current];
            return result;
          }, {})
      };
    case RECEIVE_COMMENTS:
      const { postId } = action;
      return { ...state, [postId]: action.comments };
    case UPDATE_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          [action.comment.id]: action.comment
        }
      };
    default:
      return state;
  }
}
