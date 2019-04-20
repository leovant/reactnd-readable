import {
  ADD_POST,
  DELETE_POST,
  RECEIVE_POSTS,
  UPDATE_POST
} from '../actions/posts';

export default function posts(state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      return { ...state, [action.post.id]: action.post };
    case DELETE_POST:
      return state;
    case RECEIVE_POSTS:
      return { ...action.posts };
    case UPDATE_POST:
      return { ...state, [action.post.id]: action.post };
    default:
      return state;
  }
}
