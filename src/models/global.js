/**
 * 全局 Model
 */

import router from 'umi/router';
import localeConfig from 'config/config.locale';
import { setLanguage } from 'utils/i18n';

import {
  userInfo,
} from 'services/user';

export default {
  namespace: 'global',
  state: {
    language: localeConfig.defaultLang,
    user: {},
  },
  subscriptions: {
    // 初始化语言
    initLanguage({ dispatch }) {
      const newLang = setLanguage();

      if (newLang !== localeConfig.defaultLang) {
        dispatch({
          type: 'updateState',
          payload: {
            language: newLang,
          },
        });
      }
    },
  },
  effects: {
    // 切换语言
    * switchLanguage({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload,
      });

      setLanguage(payload.language);
    },

    /**
     * 检查会话
     * payload: 该对象可以不传，不传则只坚持会话状态，不做页面权限
     * @param {string} pathname: 来自哪个页面
     * @param {boolean} needLogin: 改页面是否需要登录才能访问
     */
    * checkSession({ payload }, { select, call, put }) {
      const { user } = yield select(state => state.global);

      // 状态机里没有用户信息，去查询
      if (Object.keys(user).length <= 0) {
        const resultsLogin = yield call(userInfo);

        // 成功取回用户信息
        if (resultsLogin.code === __SUCCESS__) {
          yield put({
            type: 'updateState',
            payload: {
              user: resultsLogin.data,
            },
          });

          // 如果是未登录才能访问到的页面，那么跳转去用户中心
          if (payload && payload.needLogin === false) {
            router.replace({
              pathname: '/user',
            });
          }

          return {
            code: __ISLOGGED__,
          };
        }

        // 如果是需要登录后才能访问的页面，那么跳转去登录页
        if (payload && payload.needLogin === true) {
          router.replace({
            pathname: '/user/login',
            query: {
              from: payload.pathname,
            },
          });
        }

        // 用户信息获取失败
        return {
          code: __NOTLOGGED__,
        };
      }

      // 如果是未登录才能访问到的页面，那么跳转去用户中心
      if (payload && payload.needLogin === false) {
        router.replace({
          pathname: '/user',
        });
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
