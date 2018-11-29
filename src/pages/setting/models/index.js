/**
 * 设置中心 Model
 */

import { Toast } from 'antd-mobile';

import {
  logout,
} from 'services/user';

export default {
  namespace: 'setting',
  state: {

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/setting') {
          dispatch({
            type: 'global/checkSession',
          });
        }
      });
    },
  },
  effects: {
    // 提交注销
    * submitLogout(action, { call, put, select }) {
      const { user } = yield select(state => state.global);

      if (user.logged) {
        const response = yield call(logout);
        const { code } = response;

        if (code === __SUCCESS__) {
          // 注销成功
          yield put({
            type: 'global/updateState',
            payload: {
              user: {
                logged: false,
                info: {},
              },
            },
          });
        } else {
          // 注销失败
          Toast.fail(response.message, 1);
        }
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
