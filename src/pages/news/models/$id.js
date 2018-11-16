/**
 * 资讯详情 Model
 */

import pathToRegexp from 'path-to-regexp';

import {
  newsDetail,
} from 'services/news';

export default {
  namespace: 'newsDetail',
  state: {
    result: {},
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/news/:id').exec(pathname);

        if (match) {
          dispatch({
            type: 'fetchNewsDetail',
            payload: {
              id: match[1],
            },
          });
        }
      });
    },
  },
  effects: {
    // 获取资讯详情
    * fetchNewsDetail({ payload }, { call, put }) {
      const response = yield call(newsDetail, payload);

      yield put({
        type: 'updateState',
        payload: {
          result: response,
        },
      });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
