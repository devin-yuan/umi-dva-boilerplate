/**
 * 通用配置
 */

const commonConfig = {
  env: process.env.UMI_ENV || 'local', // 当前项目的环境变量
  title: 'Boilerplate with UmiJS & DvaJS', // 网站默认标题
  mobile: true, // 是否为移动端项目，该项目基于移动端组件开发，在本项目中请勿改成 false
  routerTransition: true, // 路由动效，需要 mobile 为 true 时才能使用
};

/**
 * 全局变量
 * 在 .umirc.js 中的 define 抛出给项目使用
 */
commonConfig.globalVariable = {
  /* 环境变量相关 */
  __ENV__: commonConfig.env, // 当前项目环境
  __LOCAL__: commonConfig.env === 'local', // 是否为开发环境
  __TEST__: commonConfig.env === 'test', // 是否为测试环境
  __PROD__: commonConfig.env === 'prod', // 是否为生产环境
  /* 接口 code 相关，可根据实际业务情况修改、增删 */
  __SUCCESS__: 0, // 成功
  __FAIL__: 400, // 失败
  __TIMEOUT__: -1, // 超时
  __OFFLINE__: 600, // 网络连接失败
  __IGNORE__: 2021, // 不需处理的错误
};

module.exports = commonConfig;
