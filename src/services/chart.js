/**
 * 图表模块 Services
 */

import request from 'utils/request';
import apiConfig from 'config/config.api';

// 港股分时图
export const minuteHK = (params) => {
  const options = {
    method: 'get',
    url: apiConfig.chart.minuteHK,
    data: params,
  };

  return request(options);
};
