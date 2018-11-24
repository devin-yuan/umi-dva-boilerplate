/* eslint-disable no-underscore-dangle */

/**
 * 图表模块 Mock
 */

import commonConfig from '../config/config.common';
import chartApi from '../config/api/chart';
import Mock from 'mockjs';
import { delay } from 'roadhog-api-doc';

const { Random, mock } = Mock;

// 返回状态码
const stateCode = commonConfig.globalVariable;

const proxy = {
  [`GET /${chartApi.minuteHK}`]: (req, res) => {
    const result = mock({
      code: stateCode.__SUCCESS__,
      data: {
        preClose: Random.float(310, 320, 3, 3), // 昨收
        'tsArray|1-332': [
          [
            Random.float(300, 320, 3, 3), // 当前价
            Random.float(300, 320, 3, 3), // 均价
            Random.integer(10000, 9000000), // 成交量
            Random.integer(10000000, 9000000000), // 成交额
          ],
        ],
      },
    });

    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 返回结果
    res.status(200).json(result);
  },
};

// 调用 delay 函数，为所有的请求添加延迟
export default delay(proxy, 1000);
