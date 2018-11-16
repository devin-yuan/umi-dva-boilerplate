/**
 * 资讯模块 Mock
 */

// import newsApi from 'config/api/news';
import Mock from 'mockjs';
import { delay } from 'roadhog-api-doc';

const { Random, mock } = Mock;

// 报错信息
const error = (message) => {
  return {
    code: 400,
    message: message || '发生错误',
    data: {},
  }
};

// 资讯详情
const newsDetail = mock({
  code: 0,
  data: {
    title: Random.ctitle(5, 25),
    content: `<p>${Random.cparagraph(200, 500)}</p>`,
    'imageUrls|0-5': [Random.image('530x300')],
    pubDate: Date.parse(new Date()),
  },
});

const proxy = {
  'POST /news/detail': (req, res) => {
    const { body } = req;

    let result = {};

    // 如果资讯 id 为数字类型，就返回正常结果
    if (!isNaN(Number(body.id))) {
      result = newsDetail;
    } else {
      result = error('该内容已被发布者下架')
    }

    // 添加跨域请求头
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // 返回结果
    res.status(200).json(result);
  },
};

// 调用 delay 函数，为所有的请求添加延迟
export default delay(proxy, 1000);
