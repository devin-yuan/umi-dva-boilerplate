/**
 * UmiJS 配置
 * 配置文档：https://umijs.org/zh/config/
 */

import commonConfig from './config/config.common';
import themeConfig from './config/config.theme';

export default {
  plugins: [
    /*
     * 插件：umi-plugin-react
     * 配置文档：https://umijs.org/zh/plugin/umi-plugin-react.html
     */
    ['umi-plugin-react', {
      dva: {
        immer: true, // 是否启用 dva-immer
      },
      antd: true, // 启用 antd，umi 内置了 antd 和 antd-mobile 依赖
      routes: {
        // 路由配置忽略以下文件夹下文件
        exclude: [
          /components/,
          /models/,
          /services/,
          /styles/,
        ],
      },
      dynamicImport: !commonConfig.routerTransition ? {
        loadingComponent: 'components/Loading/page', // 配置过场组件
      } : false,
      dll: false,
      pwa: false,
      hd: commonConfig.mobile, // 开启高清方案
      fastClick: commonConfig.mobile, // 移动端下启用 fastClick
      hardSource: false, // 通过 hard-source-webpack-plugin 开启 webpack 缓存，二次启动时间减少 80%。推荐非 windows 电脑使用，windows 下由于大文件 IO 比较慢，可自行决定是否启用。
      // 开启 title 插件，设置 HTML title
      title: {
        defaultTitle: commonConfig.title,
        format: '{current}{separator}{parent}',
        separator: ' - ',
      },
    }],
  ],
  hash: true,
  targets: {
    ie: 9,
  },
  context: {
    mobile: commonConfig.mobile, // 告诉模板，是否为移动端项目
  },
  /* ---------- 以下为 webpack 的配置 ---------- */
  theme: themeConfig(), // 主题配置
  define: commonConfig.globalVariable, // 抛出全局变量
  // 简化文件目录 url
  alias: {
    config: `${__dirname}/config`,
    assets: `${__dirname}/src/assets`,
    components: `${__dirname}/src/components`,
    services: `${__dirname}/src/services`,
    styles: `${__dirname}/src/styles`,
    utils: `${__dirname}/src/utils`,
    locales: `${__dirname}/src/locales`,
  },
  extraBabelPlugins: [
    [
      'import', {
        libraryName: commonConfig.mobile ? 'antd-mobile' : 'antd',
        style: true,
      },
    ],
  ],
  ignoreMomentLocale: true, // 忽略 moment 的 locale 文件，用于减少尺寸。
};
