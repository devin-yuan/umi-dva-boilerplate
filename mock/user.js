/**
 * 用户模块 Mock
 */

import userApi from '../config/api/user';
import Mock from 'mockjs';
import cookie from 'cookie';
import { delay } from 'roadhog-api-doc';

const { Random, mock } = Mock;

// 报错信息
const error = (message, code = 400) => ({
  code,
  message: message || '发生错误',
  data: {},
});

// 登录
const login = mock({
  code: 0,
  data: {},
});

const proxy = {
  [`POST /${userApi.login}`]: (req, res) => {
    const { body, headers } = req;
    const cookies = cookie.parse(headers.cookie || '');
    // 测试用户名 admin
    const isUsername = body.username === 'admin';
    // 测试密码 md5('admin')
    const isPassword = body.password === '21232f297a57a5a743894a0e4a801fc3';

    let result = {};

    if (!cookies.userToken) {
      // 未登录
      if (isUsername && isPassword) {
        // 登录成功
        result = login;

        /*
         * 将用户登录的token set 在 cookie 返回给客户端，用来判断用户是否登录
         * 在真实情况下，token 还应该保持在服务端 session 中
         */
        res.cookie('userToken', Random.guid(), {
          expires: new Date(Date.now() + 86400000), // 有效期为一天
          httpOnly: true,
          path: '/',
        });
      } else {
        // 登录失败
        result = error('账户名或密码错误');

        /*
         * 清除 cookie 中的用户 token
         * 在真实情况下，服务端还需要在 session 中清除掉 token
         */
        res.clearCookie('userToken', {
          path: '/',
        });
      }
    } else {
      // 已登录
      result = error('用户已登录', 452);
    }

    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 返回结果
    res.status(200).json(result);
  },
};

// 调用 delay 函数，为所有的请求添加延迟
export default delay(proxy, 1000);