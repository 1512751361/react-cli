import HistoryUtil from './History';
import config from '../config';

export const historyUtil = new HistoryUtil({
  type: config?.history?.type
});

export const { history } = historyUtil;
