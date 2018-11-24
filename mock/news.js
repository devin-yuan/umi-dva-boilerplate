/* eslint-disable no-underscore-dangle */

/**
 * 资讯模块 Mock
 */

import commonConfig from '../config/config.common';
import newsApi from '../config/api/news';
import Mock from 'mockjs';
import { delay } from 'roadhog-api-doc';

const { Random, mock } = Mock;

// 返回状态码
const stateCode = commonConfig.globalVariable;
// 报错信息
const error = (message, code = stateCode.__FAIL__) => ({
  code,
  message: message || '发生错误',
  data: {},
});

const proxy = {
  [`GET /${newsApi.newsDetail}`]: (req, res) => {
    const { query } = req;

    let result = {};

    // 如果资讯 id 为数字类型，就返回正常结果
    if (!isNaN(Number(query.id))) {
      result = mock({
        code: stateCode.__SUCCESS__,
        data: {
          title: Random.ctitle(5, 25),
          content: `<p>${Random.cparagraph(200, 500)}</p>`,
          'imageUrls|0-5': [Random.image('530x300')],
          source: Random.cname(),
          sourceAvatar: Random.image('64x64'),
          pubDate: Date.parse(new Date()),
        },
      });
    } else {
      result = error('该内容已被发布者下架');
    }

    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 返回结果
    res.status(200).json(result);
  },
};

// 调用 delay 函数，为所有的请求添加延迟
export default delay(proxy, 1000);
