/**
 * umi配置
 * Doc: https://umijs.org/zh/plugin/umi-plugin-react.html#%E9%85%8D%E7%BD%AE%E9%A1%B9
 */
import commonConfig from './config/config.common';
import themeConfig from './config/config.theme';

export default {
  plugins: [
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
      polyfills: ['ie9'],
      dynamicImport: !commonConfig.routerTransition ? {
        loadingComponent: 'components/Loading/page', // 配置过场组件
      } : false,
      dll: false,
      pwa: false,
      hd: commonConfig.mobile, // 开启高清方案
      fastClick: commonConfig.mobile, // 移动端下启用 fastClick
      hardSource: false,
      // 开启 title 插件，设置 HTML title
      title: {
        defaultTitle: commonConfig.title,
        format: '{current}{separator}{parent}',
        separator: ' - ',
      },
    }],
  ],
  context: {
    mobile: commonConfig.mobile, // 告诉模板，是否为移动端项目
  },
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
  },
  extraBabelPlugins: [
    [
      'import', {
        libraryName: commonConfig.mobile ? 'antd-mobile' : 'antd',
        style: true,
      },
    ],
  ],
}
