/**
 * 全局用户信息 Model
 */

import {
  userInfo,
} from 'services/user';

export default {
  namespace: 'globalUser',
  state: {
    info: {},
  },
  subscriptions: {

  },
  effects: {
    // 检查会话
    * checkSession(action, { select, call, put }) {
      const { info } = yield select(state => state.globalUser);

      // 状态机里没有用户信息，去查询
      if (Object.keys(info).length <= 0) {
        const resultsLogin = yield call(userInfo);

        // 成功取回用户信息
        if (resultsLogin.code === __SUCCESS__) {
          yield put({
            type: 'updateState',
            payload: {
              info: resultsLogin.data,
            },
          });

          return {
            code: __ISLOGGED__,
          };
        }

        // 用户信息获取失败
        return {
          code: __NOTLOGGED__,
        };
      }

      // 状态机里有用户信息，当前为登录状态
      return {
        code: __ISLOGGED__,
      };
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
