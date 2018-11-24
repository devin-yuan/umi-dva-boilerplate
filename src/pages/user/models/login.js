/**
 * 登录 Model
 */

import {
  login,
} from 'services/user';

export default {
  namespace: 'userLogin',
  state: {
    result: {},
  },
  subscriptions: {

  },
  effects: {
    // 提交登录
    * submitLogin({ payload }, { call, put }) {
      const response = yield call(login, payload);

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
