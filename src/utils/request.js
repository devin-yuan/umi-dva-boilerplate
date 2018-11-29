/**
 * 请求方法
 */

import axios from 'axios';
import pathToRegexp from 'path-to-regexp';
import commonConfig from 'config/config.common';
import { message } from 'antd';
import { Toast } from 'antd-mobile';

axios.defaults.withCredentials = true;

const fetch = (options) => {
  let {
    method = 'post', // eslint-disable-line prefer-const
    data,
    url,
  } = options;
  let domin = '';

  // 拆分请求url
  if (url.match(/\/\/[^/]*/)) {
    // 请求的host
    // eslint-disable-next-line prefer-destructuring
    domin = url.match(/\/\/[^/]*/)[0];
    // 请求的api地址
    url = url.slice(domin.length);
  }

  data = data || {};

  try {
    const match = pathToRegexp.parse(url);

    url = pathToRegexp.compile(url)(data);

    for (const item of match) {
      if (item instanceof Object && item.name in data) {
        delete data[item.name];
      }
    }

    url = domin + url;
  } catch (e) {
    if (commonConfig.mobile) {
      Toast.fail(e.message);
    } else {
      message.error(e.message);
    }
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: data,
      });
    case 'delete':
      return axios.delete(url, {
        data,
      });
    case 'post':
      return axios.post(url, data);
    case 'put':
      return axios.put(url, data);
    case 'patch':
      return axios.patch(url, data);
    default:
      return axios(options);
  }
};

const request = (options) => {
  const result = fetch(options).then((response) => {
    const { data } = response;
    const { code } = data;

    // 如果未登录
    if (code === __NOTLOGGED__) {
      // 清掉状态机里的用户信息
      // eslint-disable-next-line
      window.g_app._store.dispatch({
        type: 'global/updateState',
        payload: {
          user: {},
        },
      });
    }

    return data;
  }).catch((error) => {
    const { response } = error;

    let msg;
    let code;
    let otherData = {};

    if (response) {
      const { data, statusText } = response;

      otherData = data;
      code = response.status;
      msg = data.message || statusText;
    } else {
      code = __OFFLINE__;
      msg = 'Network Error!';
    }

    return {
      code,
      message: msg,
      ...otherData,
    };
  });

  return result;
};

export default request;
