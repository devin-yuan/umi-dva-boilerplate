/**
 * 用户模块 Services
 */

import request from 'utils/request';
import apiConfig from 'config/config.api';

// 登录
export const login = (params) => {
  const options = {
    url: apiConfig.user.login,
    data: params,
  };

  return request(options);
};

// 注销
export const logout = () => {
  const options = {
    url: apiConfig.user.logout,
  };

  return request(options);
};

// 用户信息
export const userInfo = () => {
  const options = {
    method: 'get',
    url: apiConfig.user.info,
  };

  return request(options);
};
