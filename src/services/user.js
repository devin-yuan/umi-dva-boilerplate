/**
 * 用户模块 Services
 */

import request from 'utils/request';
import apiConfig from 'config/config.api';

// 资讯详情
export const login = (params) => {
  const options = {
    url: apiConfig.user.login,
    data: params,
  };

  return request(options);
};
