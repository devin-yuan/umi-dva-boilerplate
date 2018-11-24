/**
 * 图表示例 Model
 */

import {
  minuteHK,
} from 'services/chart';

export default {
  namespace: 'demoCharts',
  state: {
    minuteData: {},
    kLineData: {},
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {
        if (pathname === '/demo/charts') {
          dispatch({
            type: 'fetchMinuteHK',
            payload: {
              id: 1,
            },
          });
        }
      });
    },
  },
  effects: {
    // 获取港股分时图数据
    * fetchMinuteHK({ payload }, { call, put }) {
      const response = yield call(minuteHK, payload);

      yield put({
        type: 'updateState',
        payload: {
          minuteData: response,
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
