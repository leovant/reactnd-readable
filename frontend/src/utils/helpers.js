import moment from 'moment';
const uuid = require('uuid/v1');

export const fromNow = timestamp => moment(timestamp).fromNow();

export const now = () => moment().unix();

export const generateId = () => uuid();
