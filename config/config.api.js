/**
 * 接口配置
 */

import chartApi from './api/chart';
import newsApi from './api/news';
import userApi from './api/user';

// 当前环境
const curEnv = __ENV__ || 'local';
// 不同环境中接口的请求地址
const targetConfig = {
  local: '//localhost:9200', // 开发环境
  test: '//test.abc.com', // 测试环境
  prod: '//api.abc.com', // 生产环境
};
// 获取当前环境的请求地址
const curTarget = targetConfig[curEnv];
// 拼接请求地址
const api = (url) => {
  const fullApi = {};

  for (const i in url) {
    fullApi[i] = `${curTarget}/${url[i]}`;
  }

  return fullApi;
};

export default {
  chart: api(chartApi),
  news: api(newsApi),
  user: api(userApi),
};
