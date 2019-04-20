import { getCategories } from '../utils/api';
import { error } from '../utils/helpers';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const retrieveCategories = () => dispatch =>
  getCategories()
    .then(categories => dispatch(receiveCategories(categories)))
    .catch(() => error('Could not get categories!'));
