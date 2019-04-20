import { getCategories } from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const retrieveCategories = () => dispatch =>
  getCategories().then(categories => dispatch(receiveCategories(categories)));
