/**
 * 用户中心 Model
 */

export default {
  namespace: 'user',
  state: {

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/user') {
          dispatch({
            type: 'global/checkSession',
            payload: {
              pathname,
              needLogin: true, // 该页面是否需要登录才能访问
            },
          }).then((res) => {
            if (res.code === __ISLOGGED__) {
              console.log('可以去拉一些用户相关的信息了'); // eslint-disable-line
            }
          });
        }
      });
    },
  },
  effects: {

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
