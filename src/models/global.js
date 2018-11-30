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
    user: {
      logged: undefined,
      info: {},
    },
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
      const { logged } = user;

      let isLogged = false;

      // 判断登录状态
      switch (logged) {
        case true:
          // 已登录
          isLogged = true;

          break;
        case false:
          // 未登录
          isLogged = false;

          break;
        default: {
          // 没有登录态，去后端获取一下
          const resultsLogin = yield call(userInfo);

          if (resultsLogin.code === __SUCCESS__) {
            // 成功取回用户信息，判断为已登录
            yield put({
              type: 'updateState',
              payload: {
                user: {
                  logged: true,
                  info: resultsLogin.data,
                },
              },
            });

            isLogged = true;
          } else {
            // 未成功取回用户信息，判断为未登录状态
            yield put({
              type: 'updateState',
              payload: {
                user: {
                  logged: false,
                  info: {},
                },
              },
            });

            isLogged = false;
          }

          break;
        }
      }

      // 判断页面权限
      if (payload) {
        if (payload.needLogin === true) {
          // 需要登录才给访问
          if (!logged) {
            router.replace({
              pathname: '/user/login',
              query: {
                from: payload.pathname,
              },
            });
          } else {
            return {
              code: __ISLOGGED__,
            };
          }
        } else {
          // 未登录才给访问
          if (logged) {
            router.replace({
              pathname: '/user',
            });
          } else {
            return {
              code: __NOTLOGGED__,
            };
          }
        }
      }

      return isLogged
        ? {
          code: __ISLOGGED__,
        }
        : {
          code: __NOTLOGGED__,
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
