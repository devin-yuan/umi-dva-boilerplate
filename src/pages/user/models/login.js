/**
 * 登录 Model
 */

import router from 'umi/router';
import { Toast } from 'antd-mobile';

import {
  login,
} from 'services/user';

export default {
  namespace: 'login',
  state: {

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/user/login') {
          dispatch({
            type: 'global/checkSession',
            payload: {
              pathname,
              needLogin: false, // 该页面是否需要登录才能访问
            },
          });
        }
      });
    },
  },
  effects: {
    // 提交登录
    * submitLogin({ payload }, { call, put, select }) {
      const { location } = yield select(state => state.routing);
      const { query } = location;
      const response = yield call(login, payload);
      const { code, data } = response;

      if (code === __SUCCESS__) {
        // 登录成功
        yield put({
          type: 'global/updateState',
          payload: {
            user: {
              logged: true,
              info: data,
            },
          },
        });

        if (query.from) {
          // 哪来的回哪
          router.replace({
            pathname: query.from,
          });
        } else {
          // 去用户中心
          router.replace('/user');
        }
      } else {
        // 登录失败
        Toast.fail(response.message, 1);
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
