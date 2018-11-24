/**
 * 全局 Model
 */

import localeConfig from 'config/config.locale';
import { setLanguage } from 'utils/i18n';

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
