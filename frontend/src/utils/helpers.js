import moment from 'moment';
import { notification } from 'antd';
const uuid = require('uuid/v1');

export const fromNow = timestamp => moment(timestamp).fromNow();

export const dateTime = timestamp =>
  moment(timestamp).format('YYYY-MM-DD HH:mm:ss');

export const now = () => moment().valueOf();

export const generateId = () => uuid();

export const error = message =>
  notification.error({
    placement: 'bottomLeft',
    message: 'Ooops!',
    description: message
  });
