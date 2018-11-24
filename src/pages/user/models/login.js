/**
 * 登录 Model
 */

import router from 'umi/router';

import {
  login,
} from 'services/user';

export default {
  namespace: 'login',
  state: {
    result: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/user/login') {
          dispatch({ type: 'globalUser/checkSession' });
        }
      });
    },
  },
  effects: {
    // 提交登录
    * submitLogin({ payload }, { call, put }) {
      const response = yield call(login, payload);
      const { code } = response;

      if (code === __SUCCESS__) {
        // 登录成功
        router.push('/user');
      } else {
        // 登录失败
        yield put({
          type: 'updateState',
          payload: {
            result: response,
          },
        });
      }
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
