/**
 * 主题配置
 */

const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');
const commonConfig = require('./config.common');

module.exports = () => {
  const themePath = commonConfig.mobile
    ? path.join(__dirname, '../src/styles/themes/antd_mobile_variables.less')
    : path.join(__dirname, '../src/styles/themes/antd_variables.less');

  return lessToJs(fs.readFileSync(themePath, 'utf8'));
};
