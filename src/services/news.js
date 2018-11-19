/**
 * 资讯模块 Services
 */

import request from 'utils/request';
import apiConfig from 'config/config.api';

// 资讯详情
export const newsDetail = (params) => {
  const options = {
    method: 'get',
    url: apiConfig.news.newsDetail,
    data: params,
  };

  return request(options);
};
