/**
 * 页面过场加载动画
 */

import React from 'react';
import './styles/page.less';

import Loading from './index';

const LoadingPage = () => (
  <div className="boilerplate-loading-page">
    <Loading row={5} cross />

    <Loading row={5} cross />

    <Loading row={5} cross />
  </div>
);

export default LoadingPage;
